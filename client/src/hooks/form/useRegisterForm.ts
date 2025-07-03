import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegisterPayload,
  type RegisterSchema,
  registerSchema,
} from '@/schemas/register.schema';

export function useRegisterForm(onSubmit: (data: RegisterPayload) => void) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
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
