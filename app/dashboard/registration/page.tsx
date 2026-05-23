import React from 'react';
import RegistrationForm from '@/app/ui/registration-form';

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4">Registration</h2>
      <RegistrationForm />
    </div>
  );
}
