import { Contact } from '~/types/models.interface';
import { Button, Icon, Input } from './common';
import styled from '@emotion/styled';

type Props = {
  data: Contact | Omit<Contact, 'created_at' | 'id'>;
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  validator: any;
};

const UserForm = ({ data, validator }: Props) => {
  const onAddNumber = () => {
    data.phones.push({ number: '' });
  };

  return (
    <Form action=''>
      <Input
        name='fist_name'
        label='First Name'
        value={data.first_name}
        onChange={(e) => (
          (data.first_name = e.target.value),
          (validator.value.first_name = e.target.value)
        )}
        error={
          validator?.errors.first_name.length
            ? validator?.errors.first_name[0].message
            : undefined
        }
      />
      <Input
        name='last_name'
        label='Last Name'
        value={data.last_name}
        onChange={(e) => (
          (data.last_name = e.target.value),
          (validator.value.last_name = e.target.value)
        )}
        error={
          validator?.errors.last_name.length
            ? validator?.errors.last_name[0].message
            : undefined
        }
      />

      {data.phones.map((phone, key) => (
        // rome-ignore lint/suspicious/noArrayIndexKey: <no unique property, useId hook is non-option due to dynamic render>
        <PhoneWrapper key={key}>
          <Input
            name={`phone_number_${key}`}
            label={key ? `Additional Phone Number ${key}` : 'Phone Number'}
            value={phone.number}
            onChange={(e) => (phone.number = e.target.value)}
            type='number'
            icon={
              <Button
                type='button'
                color='nord1'
                onClick={() => {
                  if (data.phones.length > 1) {
                    data.phones.splice(key, 1);
                  } else {
                    alert('need to have at least one number');
                  }
                }}
              >
                <Icon>remove</Icon>
              </Button>
            }
          />
        </PhoneWrapper>
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

const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.small};
  align-items: flex-end;

  & div {
    flex: 1;
  }

  button {
    border-radius: 4px;
    padding: 8px;
    aspect-ratio: 2/1;
  }
`;

export default UserForm;
