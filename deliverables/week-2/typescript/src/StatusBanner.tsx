import type { FormState } from './formState'
import { describeState } from './formState'

// TODO: render describeState(state). When state.status === 'error', wrap the
// text in an element with role="alert" so screen readers announce it.
export function StatusBanner({ state }: { state: FormState }) {
  return <div>{describeState(state)}</div>
}
