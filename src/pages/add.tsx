import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import UserForm from '~/components/UserForm';
import { Button } from '~/components/common';
import useHeader from '~/hooks/useHeader';
import useReactive from 'react-use-reactive';
import { useMutation } from '@apollo/client';
import { GET_CONTACTS, POST_CONTACT_WITH_PHONE } from '~/services';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [addContact, { data: res, loading, error }] = useMutation(
    POST_CONTACT_WITH_PHONE,
    {
      refetchQueries: ['res'],
      update: (cache, res) => {
        console.log('cache data', cache);
      },
    }
  );
  const { setHeaderContent } = useHeader();
  const data = useReactive({
    first_name: '',
    last_name: '',
    phones: [{ number: '' }],
  });

  const onSaveContact = async () => {
    try {
      await addContact({ variables: data });
      console.log(res);
      navigate('/');
    } catch (error) {}
  };

  useLayoutEffect(() => {
    setHeaderContent(
      <Header>
        <h1>Add Contact</h1>
      </Header>
    );
  }, []);
  if (loading) return <div>saving data...</div>;
  return (
    <FormContainer>
      <UserForm data={data} />
      <FormFooter>
        <Button color='secondary' fullWidth>
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
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.base};
`;

export default Add;
