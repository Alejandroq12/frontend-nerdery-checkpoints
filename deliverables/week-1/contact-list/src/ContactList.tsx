import type { Contact } from './types'

// TODO: render one ContactCard per contact (stable key), or "No contacts found" when empty.
export function ContactList({ contacts }: { contacts: Contact[] }) {
  return <div>TODO: ContactList ({contacts.length} contacts)</div>
}
