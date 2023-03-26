/** @jsxImportSource @emotion/react */
import theme from '~/styles/theme';
import { HTMLProps, ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color: 'primary' | 'secondary';
}

const Button = styled.button`
  background-color: ${(props: Props) => theme.colors[props.color]};
  color: ${theme.colors.background};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize.base};
  padding: ${theme.spacing.small} ${theme.spacing.base};
  border-radius: ${theme.borderRadius.base};
`;

export default Button;
