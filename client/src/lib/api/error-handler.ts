import { toast } from 'sonner';
import { getErrorToastContent } from '@/components/toasts/getErrorToastContent';
import { getSuccessToastContent } from '@/components/toasts/getSuccessToastContent';

interface GetErrorMessageParams {
  context?: 'auth' | 'category' | 'item';
  status?: number;
  raw?: string | string[];
  fallback?: string;
}

/**
 * Resolves error messages based on status code and feature context
 * @returns an array of messages to show in the UI
 */
export function getErrorMessage({
  context,
  status,
  raw,
  fallback = 'An unexpected error occurred',
}: GetErrorMessageParams): string[] {
  const messages: string[] = Array.isArray(raw) ? raw : [raw ?? fallback];

  if (!status) return messages;

  switch (context) {
    case 'auth':
      if (status === 409 && raw?.includes('email'))
        return ['An account with this email already exists'];
      if (status === 409 && raw?.includes('username'))
        return ['This username is already taken'];
      if (status === 401) return ['Invalid email or password'];
      break;

    case 'category':
      if (status === 409) return ['A category with this name already exists'];
      if (status === 400) return ['Invalid category name or color'];
      break;

    case 'item':
      if (status === 409) return ['An item with this name already exists'];
      if (status === 400) return ['Missing or invalid item fields'];
      break;
  }

  return messages;
}

type ApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
};

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

/**
 * Displays a custom success toast with a consistent look
 * @param message - The message to display
 */
export function handleApiSuccess(message: string) {
  toast.custom((id) => getSuccessToastContent(id, message), {
    duration: 3500,
    dismissible: true,
  });
}