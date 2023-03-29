import styled from '@emotion/styled';
import { AppTheme } from '~/styles/theme';

interface Props {
  color: keyof AppTheme['colors'];
  fullWidth?: boolean;
  outlined?: boolean;
  ghost?: boolean;
}

const Button = styled.button<Props>`
  ${({ theme, color, fullWidth, outlined, ghost }) => `
  background-color: ${outlined || ghost ? 'transparent' : theme.colors[color]};
  color: ${outlined || ghost ? theme.colors[color] : theme.colors.background};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize.base};
  font-weight: 500;
  padding: ${theme.spacing.small} ${theme.spacing.base};
  border-radius: ${theme.borderRadius.base};
  border: ${ghost ? 'transparent' : theme.colors[color]} 1.5px solid;
  ${fullWidth && 'width: 100%;'}
  `}
`;

export default Button;
