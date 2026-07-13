// TODO: return `value`, but only update the returned value `delayMs` ms after
// `value` stops changing. Use useState + useEffect with setTimeout, and clear
// the timeout in the effect cleanup so rapid changes reset the timer.
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  void delayMs
  return value
}
