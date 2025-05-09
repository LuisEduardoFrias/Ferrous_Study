import { useRef, useEffect } from 'react';

export function useClickInSide(onClick: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && event.target === ref.current) {
        onClick();
      }
    }

    if (ref.current) {
      ref.current.addEventListener('mousedown', handleClick);
      ref.current.addEventListener('touchstart', handleClick);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', handleClick);
        ref.current.removeEventListener('touchstart', handleClick);
      }
    };
  }, [onClick]);

  return ref;
}
