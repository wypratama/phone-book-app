import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { BottomNav, Icon, Input } from '~/components/common';
import Avatar from '~/components/common/Avatar';
import client from '~/configs/graphql';
import useHeader from '~/hooks/useHeader';
import { DELETE_CONTACT_BY_ID, GET_CONTACT_DETAIL } from '~/services';
import { LoaderData } from '~/types/common.type';
import { Contact } from '~/types/models.interface';

const ContactDetail = () => {
  const navigate = useNavigate();
  const { setHeaderContent } = useHeader();
  const {
    data: { contact_by_pk: contact },
  } = useLoaderData() as LoaderData<typeof loader>;
  const [deleteContact] = useMutation(DELETE_CONTACT_BY_ID);

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

  useLayoutEffect(() => {
    setHeaderContent(
      <Header>
        <Avatar contact={contact} size={100} />
        <h2>
          {contact.first_name} {contact.last_name}
        </h2>
      </Header>
    );
  }, []);

  return (
    <div>
      <h2>
        {contact.first_name} {contact.last_name}
      </h2>
      {contact.phones.map(({ number }) => (
        <Input
          name={number}
          value={number}
          label='Phone Number:'
          readOnly
          key={number}
        />
      ))}
      <BottomNav>
        <IconText>
          <Icon>favorite_border</Icon>
          <span>Favorite</span>
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
    </div>
  );
};

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
