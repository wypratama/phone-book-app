import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SubmitFunction } from 'react-router-dom';

const useInfiniteScroll = () => {
  const loadingRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          setTimeout(() => {
            setIsIntersecting(false);
          }, 100);
        }
      },
      {
        threshold: 1,
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadingRef.current]);

  return {
    loadingRef,
    isIntersecting,
  };
};

export default useInfiniteScroll;
