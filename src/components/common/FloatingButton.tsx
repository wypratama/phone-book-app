import styled from '@emotion/styled';

type Props = {
  clicked: boolean;
};

const FloatingActionButton = styled.button<Props>`
  @keyframes rotateFade {
    from {
      opacity: 1;
      transform: rotate(0deg);
    }
    to {
      opacity: 0;
      transform: rotate(360deg);
    }
  }

  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  svg {
    color: white;
  }

  ${({ clicked }) =>
    clicked &&
    `
      animation: rotateFade 1s forwards;
    `}
`;

export default FloatingActionButton;
