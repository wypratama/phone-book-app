import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { BackButton, BottomNav, Icon, Input } from '~/components/common';
import Avatar from '~/components/common/Avatar';
import client from '~/configs/graphql';
import useHeader from '~/hooks/useHeader';
import useIndexedDB from '~/hooks/useIndexedDb';
import { DELETE_CONTACT_BY_ID, GET_CONTACT_DETAIL } from '~/services';
import { LoaderData } from '~/types/common.type';
import { Contact } from '~/types/models.interface';

const ContactDetail = () => {
  const { get, set, deleteItem, db } = useIndexedDB('phonebook', 'favorite');
  const navigate = useNavigate();
  const { setHeaderContent } = useHeader();
  const {
    data: { contact_by_pk: contact },
  } = useLoaderData() as LoaderData<typeof loader>;
  const [isFavorit, setIsFavorit] = useState(false);
  const [deleteContact] = useMutation(DELETE_CONTACT_BY_ID);

  const onClickFavorit = async () => {
    if (isFavorit) {
      deleteItem(contact.id);
      setIsFavorit(false);
    } else {
      await set(contact.id, contact);
      setIsFavorit(true);
    }
    navigate('/');
  };

  const onEditContact = () => {
    navigate(`/edit/${contact.id}`);
  };

  const onDeleteContact = async () => {
    await deleteContact({
      variables: {
        id: contact.id,
      },
    });
    navigate('/');
  };

  useEffect(() => {
    if (db) {
      get(contact.id).then((x) => {
        console.log('dari get', x);
        if (x) setIsFavorit(true);
      });
    }
  }, [db]);

  useLayoutEffect(() => {
    setHeaderContent(
      <Header>
        <Avatar contact={contact} size={100} />
        <h2>
          {contact.first_name} {contact.last_name}
        </h2>
        <IconBack
          onClick={() => {
            navigate(-1);
          }}
        >
          arrow_back_ios
        </IconBack>
      </Header>
    );
  }, []);

  return (
    <Space>
      {contact.phones.map(({ number }, i) => (
        <Input
          name={number}
          value={number}
          label={i ? `Additional Number ${i}` : 'Phone Number:'}
          readOnly
          key={number}
        />
      ))}
      <Spacer />
      <BottomNav>
        <IconText onClick={onClickFavorit}>
          <Icon>{isFavorit ? 'favorite' : 'favorite_border'}</Icon>
          <span>{isFavorit ? 'Unfavorite' : 'Favorite'}</span>
        </IconText>
        <IconText onClick={onEditContact}>
          <Icon>edit</Icon>
          <span>Edit</span>
        </IconText>
        <IconText onClick={onDeleteContact}>
          <Icon>delete</Icon>
          <span>Delete</span>
        </IconText>
      </BottomNav>
    </Space>
  );
};

const Space = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.base};
  color: ${({ theme }) => theme.colors.accent};
  gap: ${({ theme }) => theme.spacing.small};
`;

const IconText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconBack = styled(BackButton)`
  left: ${({ theme }) => theme.spacing.large};
  top: ${({ theme }) => theme.spacing.large};
`;

const Spacer = styled.div`
  margin-bottom: 120px;
`;

export const loader = (async ({ params, request }) => {
  const res = await client.query<{ contact_by_pk: Contact }>({
    query: GET_CONTACT_DETAIL,
    variables: {
      id: params.contactId,
    },
    // fetchPolicy: 'network-only',
  });
  return res;
}) satisfies LoaderFunction;

export default ContactDetail;
