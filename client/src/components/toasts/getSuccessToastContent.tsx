import { SuccessToast } from './SuccessToast';

/**
 * Returns the custom JSX for a success toast
 * @param id - Toast ID from Sonner
 * @param message - The message to display
 */
export function getSuccessToastContent(id: string | number, message: string) {
  return <SuccessToast toastId={id} message={message} />;
}
