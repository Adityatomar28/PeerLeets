import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface GuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuardProps) {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
