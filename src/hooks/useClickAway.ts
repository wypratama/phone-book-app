import { useEffect } from 'react';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const useClickAway = (ref: any, callback: Function) => {
  const handleClickAway = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [ref, callback]);
};

export default useClickAway;
