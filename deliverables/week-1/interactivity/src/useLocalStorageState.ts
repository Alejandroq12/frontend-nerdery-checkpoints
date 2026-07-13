// TODO: initialize state from localStorage[key] (JSON-parsed) when present,
// otherwise from initialValue. Write JSON to localStorage on every change.
export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  void key
  const setValue = (value: T | ((prev: T) => T)): void => {
    void value
  }
  return [initialValue, setValue]
}
