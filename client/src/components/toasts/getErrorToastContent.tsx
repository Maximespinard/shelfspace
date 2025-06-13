import { ErrorToast } from '@/components/toasts/ErrorToast';

/**
 * Returns a custom toast component for displaying error messages
 * @param id - The toast ID from Sonner
 * @param messages - An array of error messages to display
 */
export function getErrorToastContent(id: string | number, messages: string[]) {
  return <ErrorToast toastId={id} messages={messages} />;
}
