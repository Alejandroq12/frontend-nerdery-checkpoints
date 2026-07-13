import { useState } from 'react'

// A reusable GENERIC hook. `<T>` lets it store any shape (number, object, …)
// while keeping the value and setter fully typed at each call site.
//
// TODO:
//   - hydrate the initial value from localStorage[key] (fall back to initialValue)
//   - persist the value to localStorage on every change
//   - support both `setValue(next)` and `setValue(prev => next)` forms
export function useLocalStorageState<T>(
  _key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value] = useState<T>(initialValue)
  const setValue = (_value: T | ((prev: T) => T)): void => {
    // TODO: update state and persist to localStorage.
  }
  return [value, setValue]
}
