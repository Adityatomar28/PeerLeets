import { Navigate } from 'react-router-dom';
import { Show } from '@clerk/react';

interface GuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuardProps) {
  return (
    <>
      <Show when="signed-in">
        <Navigate to="/dashboard" replace />
      </Show>
      <Show when="signed-out">{children}</Show>
    </>
  );
}
