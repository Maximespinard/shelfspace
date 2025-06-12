import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginSchema, loginSchema } from '@/schemas/login.schema';

export function useLoginForm(onSubmit: (data: LoginSchema) => void) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    errors,
    isSubmitting,
  };
}
