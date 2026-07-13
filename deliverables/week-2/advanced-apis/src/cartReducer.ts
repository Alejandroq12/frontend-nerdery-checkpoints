export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'add'; item: { id: string; name: string; price: number } }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' }

export const initialCart: CartState = { items: [] }

// STUB: returns state unchanged so behaviour tests fail (RED).
export function cartReducer(state: CartState, _action: CartAction): CartState {
  return state
}

// STUB: returns 0 so selectTotal test fails (RED).
export function selectTotal(_state: CartState): number {
  return 0
}
