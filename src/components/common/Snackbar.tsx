import { useState, useEffect, ReactNode } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type Props = {
  message: ReactNode;
  duration?: number;
  onDismiss?: () => void;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SnackbarWrapper = styled.div<{ fadeOut: boolean }>`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #323232;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  animation: ${(props) => (props.fadeOut ? fadeOut : fadeIn)} 0.3s;
  z-index: 999;
`;

const Snackbar = ({ message, duration = 3000, onDismiss }: Props) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, duration);

    const onTransitionEnd = () => {
      if (fadeOut) {
        onDismiss?.();
      }
    };

    const snackbar = document.getElementById('snackbar');
    snackbar?.addEventListener('transitionend', onTransitionEnd);

    return () => {
      clearTimeout(timeout);
      snackbar?.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [duration, fadeOut, onDismiss]);

  return (
    <SnackbarWrapper id='snackbar' fadeOut={fadeOut}>
      {message}
    </SnackbarWrapper>
  );
};

export default Snackbar;
