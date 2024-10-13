'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

function dispatchStorageEvent(key: string, newValue: string | null | undefined) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

const setLocalStorageItem = (key: string, value: unknown) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback: (this: Window, ev: StorageEvent) => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getLocalStorageServerSnapshot = () => {
  throw Error('useLocalStorage is a client-only hook');
};

/**
 * Turn a local storage key into a stateful getter/setter pair
 *
 * @param key
 * @param initialValue
 * @returns
 */
export function useLocalStorage<T = unknown>(key: string, initialValue: T) {
  const getSnapshot = () => getLocalStorageItem(key);

  const store =
    useSyncExternalStore(useLocalStorageSubscribe, getSnapshot, getLocalStorageServerSnapshot) ??
    '';

  const setState = useCallback(
    (v: T) => {
      try {
        const nextState = typeof v === 'function' ? v(JSON.parse(store)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof initialValue !== 'undefined') {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
