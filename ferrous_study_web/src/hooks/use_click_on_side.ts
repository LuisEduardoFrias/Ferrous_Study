import { useEffect, useRef, MutableRefObject } from 'react';

export function useClickInSide<T extends HTMLElement = HTMLElement>(onClick: () => void, refOutSede?: MutableRefObject<{ [key: string]: T | null }>) {
  const ref = useRef<T>(refOutSede);

  useEffect(() => {
    function handleClick(event) {
      if (ref?.current && event.target === ref?.current) {
        onClick();
      }
    }

    if (ref?.current) {
      ref?.current?.addEventListener('mousedown', handleClick);
      ref?.current?.addEventListener('touchstart', handleClick);
    }

    return () => {
      if (ref?.current) {
        ref?.current?.removeEventListener('mousedown', handleClick);
        ref?.current?.removeEventListener('touchstart', handleClick);
      }
    };
  }, [onClick]);

  return ref;
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(onClick: () => void, refOutSide?: MutableRefObject<{ [key: string]: T | null }>) {
  const ref = useRef<T>(refOutSide?.current || null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onClick, ref]);

  return ref;
}
