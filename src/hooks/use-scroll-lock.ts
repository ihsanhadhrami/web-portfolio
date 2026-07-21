import { useEffect } from 'react';

/**
 * Locks body scroll while `locked` is true (e.g. for the mobile menu).
 * Restores the previous overflow value on cleanup.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
