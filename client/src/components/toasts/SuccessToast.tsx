import { toast } from 'sonner';
import { CheckCircle, X } from 'lucide-react';

type SuccessToastProps = {
  message: string;
  toastId: string | number;
};

export function SuccessToast({ message, toastId }: SuccessToastProps) {
  return (
    <div className="relative w-[360px] max-w-full rounded-xl border border-emerald-300 bg-emerald-100 p-4 pr-10 shadow-lg dark:border-emerald-600 dark:bg-emerald-900">
      {/* Close */}
      <button
        onClick={() => toast.dismiss(toastId)}
        className="absolute right-2 top-2 text-emerald-400 hover:text-emerald-600 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3">
        <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
          {message}
        </div>
      </div>
    </div>
  );
}
