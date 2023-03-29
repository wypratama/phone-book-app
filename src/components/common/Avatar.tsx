import styled from '@emotion/styled';
import { Contact } from '~/types/models.interface';
import { getRandomColor } from '~/utils';

type Props = {
  contact: Contact;
  size?: number;
};

const AvatarContainer = styled.div<{ size: number; backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: #ffffff;
  font-size: ${({ size }) => `${Math.floor(size / 2)}px`};
  font-weight: bold;
`;

const Avatar = ({ contact, size = 40 }: Props) => {
  const firstLetter = contact.first_name.charAt(0).toUpperCase();
  const color = getRandomColor(`${contact.first_name} ${contact.last_name}`);

  return (
    <AvatarContainer backgroundColor={color} size={size}>
      {firstLetter}
    </AvatarContainer>
  );
};

export default Avatar;
