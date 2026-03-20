import { useEffect } from 'react';

const BASE = 'Shopsmart';

/**
 * Sets document.title for the current page (e-commerce storefront branding).
 */
export function usePageTitle(titleSuffix) {
  useEffect(() => {
    const previous = document.title;
    document.title = titleSuffix ? `${titleSuffix} · ${BASE}` : BASE;
    return () => {
      document.title = previous;
    };
  }, [titleSuffix]);
}
