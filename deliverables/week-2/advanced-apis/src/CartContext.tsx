import React from 'react'
import { type CartState, initialCart } from './cartReducer'

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

// STUB: provider just renders children.
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// STUB: returns a dummy that does NOT throw and never updates, so the
// context + integration tests fail (RED).
export function useCart(): CartApi {
  return {
    state: initialCart,
    total: 0,
    add: () => {},
    remove: () => {},
    setQty: () => {},
    clear: () => {},
  }
}
