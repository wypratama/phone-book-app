import styled from '@emotion/styled';
import { useLayoutEffect } from 'react';
import UserForm from '~/components/UserForm';
import { Button } from '~/components/common';
import useHeader from '~/hooks/useHeader';
import { Contact } from '~/types/models.interface';

type Props = {
  contact: Contact;
};

const Edit = ({ contact }: Props) => {
  const { setHeaderContent } = useHeader();

  useLayoutEffect(() => {
    setHeaderContent(
      <Header>
        <h1>Add Contact</h1>
      </Header>
    );
  }, []);

  return (
    <FormContainer>
      <UserForm data={contact} />
      <FormFooter>
        <Button color='secondary' fullWidth>
          Cancel
        </Button>
        <Button color='primary' fullWidth>
          Submit
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

export default Edit;
