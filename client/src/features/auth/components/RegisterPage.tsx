import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { Button } from '@/components/ui/shadcn/button';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import Section from '@/components/ui/base/Section';
import { useRegisterForm } from '../hooks/useRegisterForm';
import type { RegisterPayload } from '../schemas/register.schema';
import { registerUserApi } from '../api/auth';
import { handleApiError } from '@/lib/utils/handleApiError';
import { handleApiSuccess } from '@/lib/utils/handleApiSuccess';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onSubmit = async ({ email, username, password }: RegisterPayload) => {
    try {
      await registerUserApi({ email, username, password });
      handleApiSuccess('Account created!');
      reset();
      navigate('/login');
    } catch (err: unknown) {
      handleApiError(err, undefined, 'auth');
    }
  };

  const { register, handleSubmit, reset, errors, isSubmitting } =
    useRegisterForm(onSubmit);

  return (
    <Section className="min-h-[calc(100vh-64px)] flex items-center justify-center py-16">
      <MotionDiv
        variant="fadeInUp"
        delay={0.1}
        className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg space-y-6"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">Create your account</h2>
          <p className="text-muted-foreground text-sm">
            It’s free and only takes a few seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="shelfmaster"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="cta"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating account...'
              : 'Create my account for free'}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-white underline underline-offset-4 hover:text-white/90"
          >
            Log in
          </Link>
        </p>
      </MotionDiv>
    </Section>
  );
};

export default RegisterPage;
