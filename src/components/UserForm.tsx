import { Contact } from '~/types/models.interface';
import { Button, Input } from './common';
import styled from '@emotion/styled';

type Props = {
  data: Contact | Omit<Contact, 'created_at' | 'id'>;
};

const UserForm = ({ data }: Props) => {
  const onAddNumber = () => {
    data.phones.push({ number: '' });
  };

  return (
    <Form action=''>
      <Input
        name='fist_name'
        label='First Name'
        value={data.first_name}
        onChange={(e) => (data.first_name = e.target.value)}
      />
      <Input
        name='last_name'
        label='Last Name'
        value={data.last_name}
        onChange={(e) => (data.last_name = e.target.value)}
      />

      {data.phones.map((phone, key) => (
        // rome-ignore lint/suspicious/noArrayIndexKey: <no unique property, useId hook is non-option due to dynamic render>
        <div key={key}>
          <Input
            name={`phone_number_${key}`}
            label={key ? `Additional Phone Number ${key}` : 'Phone Number'}
            value={phone.number}
            onChange={(e) => (phone.number = e.target.value)}
          />
        </div>
      ))}

      <Button type='button' color='nord1' outlined onClick={onAddNumber}>
        Add Phone Number
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
`;

export default UserForm;
