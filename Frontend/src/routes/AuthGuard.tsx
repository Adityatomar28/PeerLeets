import { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Show, ClerkLoading } from '@clerk/react';
import { useAuthStore } from '../store/auth.store';
import ClerkAuthSync, {
  type AuthSyncState,
} from '../components/auth/ClerkAuthSync';
import { Button } from '../components/ui/Button';

interface GuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: GuardProps) {
  const token = useAuthStore((s) => s.token);
  const [retryKey, setRetryKey] = useState(0);
  const [syncState, setSyncState] = useState<AuthSyncState>({
    status: 'syncing',
    message: null,
  });
  const handleSyncStateChange = useCallback((state: AuthSyncState) => {
    setSyncState(state);
  }, []);

  return (
    <>
      <ClerkLoading>
        <div className="min-h-screen flex items-center justify-center bg-background-base text-text-secondary text-sm">
          Loading session…
        </div>
      </ClerkLoading>
      <Show when="signed-out">
        <Navigate to="/login" replace />
      </Show>
      <Show when="signed-in">
        <ClerkAuthSync
          retryKey={retryKey}
          onStateChange={handleSyncStateChange}
        />
        {token ? (
          children
        ) : syncState.status === 'error' ? (
          <div className="min-h-screen flex items-center justify-center bg-background-base px-6">
            <div className="max-w-md text-center">
              <h1 className="text-xl font-semibold text-text-primary">
                We couldn't finish signing you in
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                {syncState.message}
              </p>
              <Button
                className="mt-5"
                onClick={() => setRetryKey((key) => key + 1)}
              >
                Try again
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-background-base text-text-secondary text-sm">
            Syncing your account…
          </div>
        )}
      </Show>
    </>
  );
}
