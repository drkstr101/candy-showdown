import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * If `paramName` exists in query string, then call `setValue()` with the value
 * and delete it from the URL.
 */
export default function useQueryParam(paramName: string, setValue: (value: string) => unknown) {
  const router = useRouter();
  useEffect(() => {
    if ('URLSearchParams' in window) {
      const { search, pathname } = window.location;
      const params = new URLSearchParams(search);
      const value = params.get(paramName);
      if (value) {
        setValue(value);
        params.delete(paramName);
        const newSearch = params.toString();
        const newAsPath = pathname + (newSearch ? `?${newSearch}` : '');
        const newPathname = router.pathname + (newSearch ? `?${newSearch}` : '');
        history.replaceState(
          { url: newPathname, as: newAsPath, options: { shallow: true } },
          '',
          newAsPath
        );
      }
    }
  }, [setValue, router.pathname, paramName]);
}
