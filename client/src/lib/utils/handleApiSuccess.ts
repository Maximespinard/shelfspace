import { toast } from 'sonner';
import { getSuccessToastContent } from '@/components/toasts/getSuccessToastContent';

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
