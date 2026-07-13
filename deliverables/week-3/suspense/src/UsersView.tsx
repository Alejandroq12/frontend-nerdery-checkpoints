// STUB — replace with a real Suspense + Error Boundary implementation.
//
// Build the feature described in README.md:
//   - a module-level promise cache created by calling fetchUsers() once,
//   - an inner component that reads it with React 19's `use(promise)` hook and
//     renders each user's name,
//   - a <Suspense> boundary whose fallback shows "Loading…",
//   - a class Error Boundary whose fallback shows an error message and a
//     "Try again" button that clears the cache, refetches, and resets the
//     boundary (e.g. by bumping a `key` to remount the subtree).
//
// This placeholder renders static text so the acceptance tests fail on
// assertions (not on import/compile errors).
export function UsersView() {
  return <p>TODO: render users with Suspense and an error boundary</p>
}
