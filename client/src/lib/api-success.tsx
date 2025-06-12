import { toast } from 'sonner';
import { SuccessToast } from '@/components/ui/base/SuccessToast';

export function handleApiSuccess(message?: string, fallback = 'Success!') {
  toast.custom(
    (id) => <SuccessToast toastId={id} message={message || fallback} />,
    {
      duration: 5000,
    }
  );
}
