import React from 'react'
import { fetchUsers, type User } from './api'

/**
 * STUB — intentionally wrong so the acceptance tests fail (RED).
 *
 * Replace this file with a real implementation:
 *  - `useUsers` must fetch ONCE and share/dedupe the result across every
 *    component under `AppStateProvider` (no duplicate in-flight requests).
 *  - `useSelectedUser` must expose a SINGLE, globally-shared selection so
 *    that sibling components read and write the same value.
 */

// STUB: provider does nothing but render children — no shared cache, no
// shared selection.
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// STUB (breaks dedupe): every component that calls this fires its own
// `fetchUsers`, so N consumers produce N network calls instead of one.
export function useUsers(): { users: User[]; isLoading: boolean } {
  const [users, setUsers] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let active = true
    fetchUsers().then((result) => {
      if (!active) return
      setUsers(result)
      setIsLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  return { users, isLoading }
}

// STUB (breaks sharing): selection lives in local component state, so each
// consumer has its OWN selection and siblings never see each other's choice.
export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  return { selectedId, select: setSelectedId }
}
