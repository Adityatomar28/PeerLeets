import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface GuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: GuardProps) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
