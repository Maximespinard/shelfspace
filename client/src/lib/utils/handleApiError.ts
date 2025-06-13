import { toast } from 'sonner';
import type { ApiError } from '@/types/api';
import { getErrorMessage } from './errorMapper';
import { getErrorToastContent } from '../../components/toasts/getErrorToastContent';

/**
 * Displays a toast notification based on an API error (Axios error)
 * @param err - The error object (usually from Axios)
 * @param fallback - Fallback message if no error message is provided
 * @param context - Optional context to map specific error messages
 */
export function handleApiError(
  err: unknown,
  fallback = 'An unexpected error occurred',
  context?: 'auth' | 'category' | 'item'
) {
  const error = err as ApiError;
  const status = error.response?.status;
  const raw = error.response?.data?.message;

  const messages = getErrorMessage({ context, status, raw, fallback });

  toast.custom((id) => getErrorToastContent(id, messages), {
    duration: Math.min(10000, 4000 + messages.length * 1500),
    dismissible: true,
  });
}
