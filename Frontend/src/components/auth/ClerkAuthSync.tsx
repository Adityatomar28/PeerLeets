import { useEffect, useRef } from 'react';
import { useAuth, useUser } from '@clerk/react';
import { useAuthStore } from '../../store/auth.store';
import { apiUrl } from '../../config/runtime';

export type AuthSyncState =
  | { status: 'syncing'; message: null }
  | { status: 'error'; message: string }
  | { status: 'success'; message: null };

interface ClerkAuthSyncProps {
  retryKey: number;
  onStateChange: (state: AuthSyncState) => void;
}

/**
 * Exchanges a Clerk session for the app's API JWT after sign-in.
 */
export default function ClerkAuthSync({
  retryKey,
  onStateChange,
}: ClerkAuthSyncProps) {
  const { isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const lastSyncedId = useRef<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !clerkUser) {
      lastSyncedId.current = null;
      clearAuth();
      return;
    }

    if (lastSyncedId.current === clerkUser.id) {
      return;
    }

    let cancelled = false;

    const sync = async () => {
      onStateChange({ status: 'syncing', message: null });

      try {
        const clerkToken = await getToken();
        if (!clerkToken) {
          throw new Error('Could not read your sign-in session. Please try again.');
        }
        if (cancelled) return;

        const response = await fetch(apiUrl('/api/auth/clerk-sync'), {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${clerkToken}`,
            'Content-Type': 'application/json',
          },
        });

        const body = await response.json().catch(() => null);
        if (!response.ok || !body.success) {
          throw new Error(body?.message || 'Failed to sync your account');
        }

        if (!cancelled) {
          lastSyncedId.current = clerkUser.id;
          setAuth(body.data.token, body.data.user);
          onStateChange({ status: 'success', message: null });
        }
      } catch (error) {
        console.error('Clerk auth sync failed:', error);
        if (!cancelled) {
          lastSyncedId.current = null;
          clearAuth();
          const message =
            error instanceof TypeError
              ? 'The PeerSolve server is unavailable. Start the API and try again.'
              : error instanceof Error
                ? error.message
                : 'Failed to sync your account';
          onStateChange({ status: 'error', message });
        }
      }
    };

    sync();

    return () => {
      cancelled = true;
    };
  }, [
    isSignedIn,
    clerkUser,
    getToken,
    setAuth,
    clearAuth,
    retryKey,
    onStateChange,
  ]);

  return null;
}
