import styled from '@emotion/styled';
import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ReactNode;
  placeholder?: string;
  label?: string;
  type?: string;
  error?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  border: ${({ theme, error }) =>
    error ? `1px ${theme.colors.error} solid` : 'none'};
  padding: ${({ theme }) => theme.spacing.base};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.nord4};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: 500;
`;

const FlexInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.base};
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.error};
  padding-top: 2px;
`;

const Input = ({
  name,
  icon,
  error,
  placeholder = '',
  label = '',
  type = 'text',
  ...props
}: Props) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <FlexInput>
        <StyledInput
          id={name}
          name={name}
          error={!!error}
          placeholder={placeholder}
          type={type}
          {...props}
        />
        {icon ? icon : null}
      </FlexInput>
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Input;
