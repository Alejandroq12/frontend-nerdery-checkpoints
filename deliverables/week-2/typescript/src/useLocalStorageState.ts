import { useEffect, useState } from 'react'

export function useLocalStorageState<T>(_key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setStateValue] = useState<T>(() => {
    const localStorageValue = localStorage.getItem(_key);
    if (localStorageValue === null) {
      return initialValue;
    } else {
      return JSON.parse(localStorageValue) as T;
    }
  })

  const setValue = (_value: T | ((prev: T) => T)): void => {
    setStateValue(_value);
  };

  useEffect(() => {
    localStorage.setItem(_key, JSON.stringify(value));
  }, [_key, value])

  return [value, setValue]
}
