import { useState, useId } from 'react';
import type { NewContact } from './types';

export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  const [isError, setIsError] = useState(false);
  
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get('name')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const role = formData.get('role')?.toString().trim() ?? '';

    const isNameValid = name.length > 0;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isNameValid || !isEmailValid) {
      setIsError(true);
      return;
    }

    setIsError(false);
    onAdd({ name, email, role });
    
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {isError && (
        <div role="alert" style={{ color: 'red' }}>
          Error: Please enter a valid name and email.
        </div>
      )}

      <div>
        <label htmlFor={nameId}>Name</label>
        <input id={nameId} name="name" type="text" />
      </div>

      <div>
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} name="email" type="email" />
      </div>

      <div>
        <label htmlFor={roleId}>Role</label>
        <input id={roleId} name="role" type="text" />
      </div>

      <button type="submit">Add</button>
    </form>
  );
}