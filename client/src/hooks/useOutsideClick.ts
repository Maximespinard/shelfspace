import { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
  active: boolean = true,
  blockIfOpen: boolean = false
) {
  useEffect(() => {
    if (!active || blockIfOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback, active, blockIfOpen]);
}
