import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  LoaderFunction,
  useLoaderData,
  useNavigate,
  ActionFunction,
  useSubmit,
  useActionData,
} from 'react-router-dom';
import client from '~/configs/graphql';
import { Contact } from '~/types/models.interface';
import { LoaderData } from '~/types/common.type';
import { GET_CONTACTS } from '~/services';
import CardContact from '~/components/CardContact';
import styled from '@emotion/styled';
import useHeader from '~/hooks/useHeader';
import { SearchInput, FloatingButton, Button, Icon } from '~/components/common';
import useInfiniteScroll from '~/hooks/useInfiniteScroll';
import useReactive from 'react-use-reactive';
import useIndexedDB from '~/hooks/useIndexedDb';

const ContactList = () => {
  const navigate = useNavigate();
  const { getAll, db } = useIndexedDB('phonebook', 'favorite');
  const { setHeaderContent } = useHeader();
  const contacts = useReactive<{
    list: Contact[];
    offset: number;
    isFullyLoaded: boolean;
  }>({
    list: [],
    offset: 0,
    isFullyLoaded: false,
  });
  const data = useLoaderData() as LoaderData<typeof loader>;
  const [favorites, setFavorites] = useState<Contact[]>([]);
  const nexData = useActionData() as LoaderData<typeof action>;
  const [clicked, setClicked] = useState(false);

  const submit = useSubmit();

  const loadMore = async () => {
    submit({ offset: (contacts.offset += 10).toString() }, { method: 'patch' });
  };
  const { loadingRef, isIntersecting } = useInfiniteScroll();

  useEffect(() => {
    loadMore();
  }, [isIntersecting]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate('/add');
      setClicked(false);
    }, 600);
  };

  useLayoutEffect(() => {
    setHeaderContent(<SearchInput />);
  }, []);

  useEffect(() => {
    if (db) {
      getAll().then((x) => {
        const stored = x as Contact[];
        if (stored.length) {
          setFavorites(stored);
        }
      });
    }
  }, [db]);

  useEffect(() => {
    if (data?.data?.contact) {
      contacts.list = [
        ...contacts.list,
        ...JSON.parse(JSON.stringify(data.data.contact)),
      ];
    }
  }, [data.data.contact]);

  useEffect(() => {
    if (nexData?.data?.contact) {
      contacts.list = [
        ...contacts.list,
        ...JSON.parse(JSON.stringify(nexData.data.contact)),
      ];
    }
    if (nexData?.data.contact.length < 10) {
      contacts.isFullyLoaded = true;
    }
  }, [nexData]);

  //filtering contacts that is in favorites
  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((favorite) => favorite.id));
  }, [favorites]);

  const filteredContacts = useMemo(() => {
    return contacts.list.filter((contact) => !favoriteIds.has(contact.id));
  }, [contacts.list, favoriteIds]);

  const isFirstLetter = useCallback(
    (index: number, item: Contact, previous: Contact) => {
      if (!previous) return index === 0;
      return (
        item.first_name[0].toLowerCase() !==
        previous.first_name[0].toLowerCase()
      );
    },
    [filteredContacts]
  );

  return (
    <>
      {favorites.length ? (
        <>
          <List>
            <FirstLetter>
              <Icon>favorites</Icon>
            </FirstLetter>
            {favorites.map((c) => (
              <CardContact contact={c} key={c.id} />
            ))}
          </List>
        </>
      ) : null}
      <List>
        {filteredContacts.map((c, i) =>
          isFirstLetter(i, c, filteredContacts[i - 1]) ? (
            <FirstLetterWrapper key={c.id}>
              <FirstLetter>{c.first_name[0].toUpperCase()}</FirstLetter>
              <CardContact contact={c} />
            </FirstLetterWrapper>
          ) : (
            <CardContact contact={c} key={c.id} />
          )
        )}

        {contacts.isFullyLoaded ? null : (
          <div ref={loadingRef}>
            Loading... {JSON.stringify(contacts.isFullyLoaded)}
          </div>
        )}
      </List>
      <FloatingButton clicked={clicked} onClick={handleClick}>
        <Icon>add</Icon>
      </FloatingButton>
    </>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

const FirstLetterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FirstLetter = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: 500;
  padding-left: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;

  &::after {
    content: '';
    height: 1.5px;
    width: 100%;
    background: ${({ theme }) => theme.colors.nord0};
  }
`;

export const loader = (async () => {
  const res = await client.query<{ contact: Contact[] }>({
    query: GET_CONTACTS,
    variables: {
      limit: 10,
      order_by: {
        first_name: 'asc', //load a - z by default
      },
    },
  });
  return res;
}) satisfies LoaderFunction;

export const action = (async ({ request }) => {
  const form = await request.formData();
  const offset = form.get('offset');
  const res = await client.query<{ contact: Contact[] }>({
    query: GET_CONTACTS,
    variables: {
      limit: 10,
      offset: offset,
      order_by: {
        first_name: 'asc', //load a - z by default
      },
    },
  });
  return res;
}) satisfies ActionFunction;

export default ContactList;
