import { useEffect } from 'react';

/**
 * Custom hook that detects clicks outside of a referenced element and triggers a callback.
 * Useful for closing dropdowns, modals, or other overlay components when clicking outside.
 * 
 * @template T - The type of HTML element being referenced
 * @param ref - React ref object pointing to the target element
 * @param callback - Function to call when a click occurs outside the referenced element
 * @param active - Whether the hook should be active (default: true)
 * @param blockIfOpen - Whether to block the outside click detection when something is open (default: false)
 * 
 * @example
 * ```tsx
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useOutsideClick(
 *   dropdownRef,
 *   () => setIsOpen(false),
 *   isOpen,
 *   false
 * );
 * ```
 */
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
