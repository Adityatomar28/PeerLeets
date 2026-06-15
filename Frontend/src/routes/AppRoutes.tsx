import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import AppLayout from '../components/layout/AppLayout';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import GroupDetails from '../pages/GroupDetails';
import Profile from '../pages/Profile';
import GroupHistory from '../pages/GroupHistory';
import GroupMembers from '../pages/GroupMembers';
import Groups from '../pages/Groups';
import Challenges from '../pages/Challenges';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <GuestGuard>
            <Landing />
          </GuestGuard>
        }
      />

      {/* Auth Pages (Guest Only) */}
      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestGuard>
            <Signup />
          </GuestGuard>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/groups"
        element={
          <AuthGuard>
            <AppLayout>
              <Groups />
            </AppLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/challenges"
        element={
          <AuthGuard>
            <AppLayout>
              <Challenges />
            </AppLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/groups/:groupId"
        element={
          <AuthGuard>
            <AppLayout>
              <GroupDetails />
            </AppLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/groups/:groupId/history"
        element={
          <AuthGuard>
            <AppLayout>
              <GroupHistory />
            </AppLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/groups/:groupId/members"
        element={
          <AuthGuard>
            <AppLayout>
              <GroupMembers />
            </AppLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <AppLayout>
              <Profile />
            </AppLayout>
          </AuthGuard>
        }
      />

      {/* Catch-all 404 Route */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
