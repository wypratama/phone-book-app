import { useEffect, useRef } from 'react';

const useInfiniteScroll = (loadMoreFn: { (): Promise<void>; (): void }) => {
  const loadingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreFn();
        }
      },
      {
        threshold: 1,
      }
    );

    if (loadingRef.current) {
      console.log('ref set');
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
  };
};

export default useInfiniteScroll;
