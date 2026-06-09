import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail, User, Users, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import { useAuthStore } from '../../store/auth.store';
import { apiClient } from '../../services/api/api.client';
import { toast } from 'sonner';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      // POST request to /api/auth/signup
      const res = await apiClient.post<{ token: string; user: { id: string; name: string; email: string } }>(
        '/api/auth/signup',
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );

      setAuth(res.token, res.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      setApiError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-base flex items-center justify-center p-6 relative">
      <div className="grid-bg-overlay" />
      <div className="glow-spot-1" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Banner */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">Get started today</h2>
          <p className="font-sans text-xs text-text-secondary mt-1">Join a squad and code consistently</p>
        </div>

        {/* Card */}
        <Card className="border-border-subtle bg-background-surface/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Enter your profile details to create your PeerSolve account</CardDescription>
          </CardHeader>
          <CardContent>
            {/* API Error Callout */}
            {apiError && (
              <div className="p-3.5 rounded-lg bg-accent-rose/10 border border-accent-rose/20 text-accent-rose text-xs flex items-start gap-2.5 mb-6 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-text-secondary">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    type="text"
                    placeholder="Alice Smith"
                    className="pl-10"
                    error={!!errors.name}
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-accent-rose font-medium mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-text-secondary">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    type="email"
                    placeholder="alice@example.com"
                    className="pl-10"
                    error={!!errors.email}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-accent-rose font-medium mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-text-secondary">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    error={!!errors.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white cursor-pointer"
                    style={{ background: 'none', border: 'none' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-accent-rose font-medium mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-text-secondary">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white cursor-pointer"
                    style={{ background: 'none', border: 'none' }}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-accent-rose font-medium mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-text-secondary border-t border-border-subtle pt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-indigo font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
