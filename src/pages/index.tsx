import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import client from '~/configs/graphql';
import {
  LoaderFunction,
  useLoaderData,
  useNavigate,
  ActionFunction,
  useSubmit,
  useActionData,
} from 'react-router-dom';
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactList = () => {
  const navigate = useNavigate();
  const { getAll, db } = useIndexedDB('phonebook', 'favorite');
  const { setHeaderContent } = useHeader();
  const contacts = useReactive<{ list: Contact[]; offset: number }>({
    list: [],
    offset: 0,
  });
  const data = useLoaderData() as LoaderData<typeof loader>;
  const [favorites, setFavorites] = useState<Contact[]>([]);
  // const nexData = useActionData() as LoaderData<typeof action>;
  const [clicked, setClicked] = useState(false);

  // let submit = useSubmit();

  const loadMore = async () => {
    navigate('/', {
      replace: true,
      state: { offset: (contacts.offset += 10) },
    });
  };
  const { loadingRef } = useInfiniteScroll(loadMore);

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
        console.log('dari list favorit', x);
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
      // setTimeout(() => {
      //   addData(data.data.contact[0]);
      // }, 3000);
    }
  }, [data.data.contact]);

  // useEffect(() => {
  //   if (nexData?.data?.contact) {
  //     vouchers.list = [
  //       ...vouchers.list,
  //       ...JSON.parse(JSON.stringify(nexData.data.contact)),
  //     ];
  //   }
  // }, [nexData]);

  //filtering contacts that is is favorites
  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((favorite) => favorite.id));
  }, [favorites]);

  const filteredContacts = useMemo(() => {
    return contacts.list.filter((contact) => !favoriteIds.has(contact.id));
  }, [contacts, favoriteIds]);

  return (
    <>
      {favorites.length ? (
        <>
          <h4>Favorites</h4>
          <List>
            {favorites.map((c) => (
              <CardContact contact={c} key={c.id} />
            ))}
          </List>
        </>
      ) : null}
      <h4>Contacts</h4>
      <List>
        {filteredContacts.map((c) => (
          <CardContact contact={c} key={c.id} />
        ))}
      </List>

      {/* {vouchers.offset ? (
        <div ref={loadingRef}>Loading...</div>
      ) : (
        <Button
          color='nord3'
          onClick={() => {
            loadMore();
          }}
          ghost
        >
          load more
        </Button>
      )} */}
      <Button
        color='nord3'
        onClick={() => {
          loadMore();
        }}
        ghost
        style={{ justifySelf: 'center' }}
      >
        load more
      </Button>
      <FloatingButton clicked={clicked} onClick={handleClick}>
        <Icon>add</Icon>
      </FloatingButton>
    </>
  );
};

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const offset = search.get('offset');
  console.log(request);
  const res = await client.query<{ contact: Contact[] }>({
    query: GET_CONTACTS,
    variables: {
      limit: 10,
      offset: offset || 0,
      order_by: {
        first_name: 'asc', //load a - z by default
      },
    },
  });
  console.log('loader called', request);
  return res;
}) satisfies LoaderFunction;

// export const action = (async ({ request }) => {
//   const form = await request.formData();
//   const offset = form.get('offset');
//   const res = await client.query<{ contact: Contact[] }>({
//     query: GET_CONTACTS,
//     variables: {
//       limit: 10,
//       offset: offset,
//       order_by: {
//         first_name: 'asc', //load a - z by default
//       },
//     },
//   });
//   console.log(`calling on offset ${offset}`, res);
//   return res;
// }) satisfies ActionFunction;

export default ContactList;
