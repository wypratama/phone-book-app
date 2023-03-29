import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Contact } from '~/types/models.interface';
import Avatar from './common/Avatar';

type Props = {
  contact: Contact;
};

const CardContact = ({ contact }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/${contact.id}`)}
      onKeyDown={(e) => e.preventDefault()}
    >
      <Avatar contact={contact} />
      <Fullname>
        {contact.first_name} {contact.last_name}
      </Fullname>
      <PhoneNumber>{contact.phones[0].number}</PhoneNumber>
    </Card>
  );
};

const Card = styled.div`
  display: grid;
  grid-template-areas:
    'avatar name'
    'avatar phone';
  grid-template-columns: 40px 1fr;
  grid-template-rows: 20px 1fr;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  & > div {
    grid-row: span 2;
  }
`;

const Fullname = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
`;

const PhoneNumber = styled.p`
  font-size: 13px;
`;

export default CardContact;
