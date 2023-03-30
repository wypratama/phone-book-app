import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import UserForm from '~/components/UserForm';
import { Avatar, Button } from '~/components/common';
import client from '~/configs/graphql';
import useHeader from '~/hooks/useHeader';
import {
  GET_CONTACT_DETAIL,
  UPDATE_CONTACT_BY_ID,
  UPDATE_NUMBER_BY_CONTACT_ID,
} from '~/services';
import { LoaderData } from '~/types/common.type';
import { Contact } from '~/types/models.interface';
import useReactive from 'react-use-reactive';
import { useMutation } from '@apollo/client';

type Props = {
  contact: Contact;
};

const Edit = () => {
  const navigate = useNavigate();
  const { setHeaderContent } = useHeader();
  const {
    data: { contact_by_pk: contact },
  } = useLoaderData() as LoaderData<typeof loader>;
  const input = useReactive<Contact>(JSON.parse(JSON.stringify(contact)));
  const [updateContact, { data, loading, error }] =
    useMutation(UPDATE_CONTACT_BY_ID);
  const [updatePhoneNumber] = useMutation(UPDATE_NUMBER_BY_CONTACT_ID);

  const onUpdate = async () => {
    try {
      await updateContact({
        variables: {
          id: input.id,
          _set: {
            first_name: input.first_name,
            last_name: input.last_name,
          },
        },

        refetchQueries: ['GetContactDetail'],
        fetchPolicy: 'no-cache',
      });

      contact.phones.forEach(({ number }, i) => {
        updatePhoneNumber({
          variables: {
            pk_columns: {
              number: number,
              contact_id: contact.id,
            },
            new_phone_number: input.phones[i].number,
          },
        });
      });
      console.log(data);
      navigate(-1);
    } catch (error) {}
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
    <FormContainer>
      <UserForm data={input} />
      <FormFooter>
        <Button color='secondary' fullWidth>
          Cancel
        </Button>
        <Button color='primary' fullWidth onClick={onUpdate}>
          Update
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const FormFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.small};
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

export const loader = (async ({ params, request }) => {
  const res = await client.query<{ contact_by_pk: Contact }>({
    query: GET_CONTACT_DETAIL,
    variables: {
      id: params.contactId,
    },
  });
  return res;
}) satisfies LoaderFunction;

export default Edit;
