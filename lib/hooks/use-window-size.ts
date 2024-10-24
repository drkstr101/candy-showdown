import { useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * This only works if the window object exists otherwise it returns [0, 0]
 * @returns [width, height]
 */
export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
