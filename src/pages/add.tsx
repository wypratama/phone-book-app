import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import UserForm from '~/components/UserForm';
import { BackButton, Button } from '~/components/common';
import useHeader from '~/hooks/useHeader';
import useReactive from 'react-use-reactive';
import { useMutation } from '@apollo/client';
import { GET_CONTACTS, POST_CONTACT_WITH_PHONE } from '~/services';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [addContact, { loading, error }] = useMutation(POST_CONTACT_WITH_PHONE);
  const { setHeaderContent } = useHeader();
  const data = useReactive({
    first_name: '',
    last_name: '',
    phones: [{ number: '' }],
  });

  const onSaveContact = async () => {
    try {
      await addContact({
        variables: data,
        refetchQueries: [
          {
            query: GET_CONTACTS,
          },
        ],
      });
      navigate('/');
    } catch (error) {}
  };

  useLayoutEffect(() => {
    setHeaderContent(
      <Header>
        <h1>Add Contact</h1>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          arrow_back_ios
        </BackButton>
      </Header>
    );
  }, []);
  if (loading) return <div>saving data...</div>;
  return (
    <FormContainer>
      <UserForm data={data} />
      <FormFooter>
        <Button
          color='secondary'
          fullWidth
          onClick={() => navigate('/', { replace: true })}
        >
          Cancel
        </Button>
        <Button color='primary' fullWidth onClick={onSaveContact}>
          Save
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.base};
`;

export default Add;
