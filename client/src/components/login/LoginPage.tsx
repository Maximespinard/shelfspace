import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { Button } from '@/components/ui/shadcn/button';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import Section from '@/components/ui/base/Section';
import { useLoginForm } from '@/hooks/forms/useLoginForm';
import { type LoginSchema } from '@/schemas/login.schema';
import { loginUserApi } from '@/lib/api/auth';
import { handleApiError } from '@/lib/utils/handleApiError';
import { useAuthStore } from '@/store/useAuthStore';

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async ({ identifier, password }: LoginSchema) => {
    try {
      const res = await loginUserApi({ identifier, password });
      login(null, res.data.accessToken);
      reset();
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      handleApiError(err, undefined, 'auth');
    }
  };

  const { register, handleSubmit, reset, errors, isSubmitting } =
    useLoginForm(onSubmit);

  return (
    <Section className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16">
      <MotionDiv
        variant="fadeInUp"
        delay={0.1}
        className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg space-y-6"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-muted-foreground text-sm">
            Log in to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or Username</Label>
            <Input
              id="identifier"
              type="text"
              placeholder="you@example.com"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className="text-sm text-red-500">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="cta"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-white underline underline-offset-4 hover:text-white/90"
          >
            Sign up
          </Link>
        </p>
      </MotionDiv>
    </Section>
  );
};

export default LoginPage;
