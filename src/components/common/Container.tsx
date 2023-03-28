/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { BreakpointSize } from '~/types/common.type';

interface Props {
  size?: BreakpointSize;
}

const Container = styled.div<Props>`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  ${({ theme, size = 'xxl' }) => {
    return `
      @media (min-width: ${theme.breakpoints[size]}px) {
        max-width: ${theme.containerSizes[size]};
      }
    `;
  }}
`;

export default Container;
