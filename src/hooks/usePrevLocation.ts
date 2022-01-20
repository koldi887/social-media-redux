import { useEffect, useRef } from 'react';

export const usePrevLocation = (location: string) => {
  let prevLocationRef = useRef<string>();

  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  return prevLocationRef.current;
};
