import { SignIn } from '@clerk/react';

export default function Login() {
  return (
    <div className="min-h-screen bg-background-base flex items-center justify-center p-6 relative">
      <div className="grid-bg-overlay" />
      <div className="relative z-10 w-full max-w-md flex justify-center">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
