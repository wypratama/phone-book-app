import styled from '@emotion/styled';
import Icon from './Icon';

const BackButton = styled(Icon)`
  position: absolute;
  left: 4px;
  color: ${({ theme }) => theme.colors.accent};
`;

export default BackButton;
