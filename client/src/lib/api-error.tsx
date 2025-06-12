import { toast } from 'sonner';
import type { ApiError } from '@/types/api';
import { ErrorToast } from '@/components/ui/base/ErrorToast';

export function handleApiError(err: unknown, fallback = 'An error occurred') {
  const error = err as ApiError;

  const raw = error.response?.data?.message;
  const status = error.response?.status;

  let messages: string[] = Array.isArray(raw)
    ? raw
    : [raw || error.message || fallback];

  switch (status) {
    case 401:
      if (messages[0] === 'Invalid credentials') {
        messages = ['The email, username or password is incorrect.'];
      } else {
        messages = ['You must be logged in to perform this action.'];
      }
      break;
    case 403:
      messages = ['You are not authorized to perform this action.'];
      break;
    case 500:
      messages = ['Something went wrong on our end. Please try again later.'];
      break;
  }

  const duration = Math.min(10000, 4000 + messages.length * 1500);

  toast.custom((id) => <ErrorToast toastId={id} messages={messages} />, {
    duration,
    dismissible: true,
  });
}
