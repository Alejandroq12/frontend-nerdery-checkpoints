import type { NewContact } from './types'

// TODO: accessible form (labels for Name/Email/Role), validate on submit,
// call onAdd only when valid, show an error message when invalid.
export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  void onAdd
  return <form>TODO: ContactForm</form>
}
