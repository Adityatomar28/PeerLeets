import { SignUp } from '@clerk/react';

export default function Signup() {
  return (
    <div className="min-h-screen bg-background-base flex items-center justify-center p-6 relative">
      <div className="grid-bg-overlay" />
      <div className="relative z-10 w-full max-w-md flex justify-center">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          fallbackRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
