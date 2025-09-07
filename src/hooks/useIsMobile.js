import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  // Compute synchronously on first render to avoid layout flash
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      return mql.matches;
    } catch {
      return window.innerWidth < breakpoint;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handleChange = (e) => setIsMobile(e.matches);

    // Ensure state matches current query
    handleChange(mql);

    // Prefer media query change events; fall back to resize for older browsers
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(handleChange);
    }

    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handleChange);
      } else if (typeof mql.removeListener === 'function') {
        mql.removeListener(handleChange);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}