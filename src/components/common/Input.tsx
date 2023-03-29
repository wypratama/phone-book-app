import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.base};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.nord4};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: 500;
`;

const Input = ({
  name,
  placeholder = '',
  label = '',
  type = 'text',
  ...props
}: Props) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput id={name} name={name} placeholder={placeholder} {...props} />
    </Container>
  );
};

export default Input;
