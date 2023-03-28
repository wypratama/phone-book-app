import styled from '@emotion/styled';

interface Props {
  color: 'primary' | 'secondary';
}

const Button = styled.button<Props>`
  ${(props) => `
  background-color: ${props.theme.colors[props.color]};
  color: ${props.theme.colors.background};
  font-family: ${props.theme.typography.fontFamily};
  font-size: ${props.theme.typography.fontSize.base};
  padding: ${props.theme.spacing.small} ${props.theme.spacing.base};
  border-radius: ${props.theme.borderRadius.base};
  `}
`;

export default Button;
