import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import UserForm from '~/components/UserForm';
import { Avatar, BackButton, Button } from '~/components/common';
import client from '~/configs/graphql';
import useHeader from '~/hooks/useHeader';
import {
  ADD_NUMBER_TO_CONTACT,
  DELETE_PHONE_BY_PK,
  GET_CONTACT_DETAIL,
  UPDATE_CONTACT_BY_ID,
  UPDATE_NUMBER_BY_CONTACT_ID,
} from '~/services';
import { LoaderData } from '~/types/common.type';
import { Contact } from '~/types/models.interface';
import useReactive from 'react-use-reactive';
import { useMutation } from '@apollo/client';

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
  const [addNumberToContact] = useMutation(ADD_NUMBER_TO_CONTACT);
  const [deleteNumberByPk] = useMutation(DELETE_PHONE_BY_PK);

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

      // add new number if input array is longer
      if (input.phones.length > contact.phones.length) {
        const oldSet = new Set(contact.phones.map((_p, i) => i));
        const newNumber = input.phones.filter((_p, i) => !oldSet.has(i));
        console.log('input is longer', newNumber);
        await Promise.all(
          newNumber.map(async ({ number }) => {
            await addNumberToContact({
              variables: {
                contact_id: contact.id,
                phone_number: number,
              },
            });
          })
        );
      } else if (input.phones.length < contact.phones.length) {
        //delete some if new input has shorter length
        const newSet = new Set(input.phones.map((_p, i) => i));
        const toRemove = contact.phones.filter((_p, i) => !newSet.has(i));
        await Promise.all(
          toRemove.map(async ({ number }) => {
            await deleteNumberByPk({
              variables: {
                id: contact.id,
                number: number,
              },
            });
          })
        );
      }

      //call updates only on number that already exist
      await Promise.all(
        contact.phones.map(async ({ number }, i) => {
          // if old index is present at new input ,
          // and old value on index is not equal new, then update
          if (input.phones[i] && +number !== +input.phones[i].number) {
            await updatePhoneNumber({
              variables: {
                pk_columns: {
                  number: number,
                  contact_id: contact.id,
                },
                new_phone_number: input.phones[i].number,
              },
            });
          }
        })
      );

      navigate(-1);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    setHeaderContent(
      <Header>
        <Avatar contact={contact} size={100} />
        <h2>
          Editing {contact.first_name} {contact.last_name}
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

  if (loading) return <div>saving data...</div>;

  return (
    <FormContainer>
      <UserForm data={input} />
      <FormFooter>
        <Button
          color='secondary'
          fullWidth
          onClick={() => {
            navigate(`/${contact.id}`, { replace: true });
          }}
        >
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
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.base};
  color: ${({ theme }) => theme.colors.accent};
  gap: ${({ theme }) => theme.spacing.small};
  position: relative;
`;

const IconBack = styled(BackButton)`
  left: ${({ theme }) => theme.spacing.large};
  top: ${({ theme }) => theme.spacing.large};
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
