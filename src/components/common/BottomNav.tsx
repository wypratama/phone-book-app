import styled from '@emotion/styled';

const BottomNav = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.base};
  justify-content: space-around;
  position: fixed;
  bottom: 20px;
  left: 2.5vw;
  padding: ${({ theme }) => theme.spacing.base};
  background: ${({ theme }) => theme.colors.nord4};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  border-radius: ${({ theme }) => `${theme.borderRadius.large}`};
  border: ${({ theme }) => theme.colors.nord10} 0.5px solid;
`;

export default BottomNav;
