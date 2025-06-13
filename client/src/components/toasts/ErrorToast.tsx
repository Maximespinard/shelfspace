import { toast } from 'sonner';
import { XCircle, X } from 'lucide-react';

type ErrorToastProps = {
  toastId: string | number;
  messages: string[];
};

export function ErrorToast({ toastId, messages }: ErrorToastProps) {
  return (
    <div className="relative w-[360px] max-w-full rounded-xl border border-rose-300 bg-rose-100 p-4 pr-10 shadow-lg dark:border-rose-500 dark:bg-rose-900">
      {/* Close */}
      <button
        onClick={() => toast.dismiss(toastId)}
        className="absolute right-2 top-2 text-rose-400 hover:text-rose-600 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3">
        <XCircle className="mt-0.5 h-5 w-5 text-rose-600 dark:text-rose-400" />
        <ul className="space-y-1 text-sm text-rose-800 dark:text-rose-100 list-disc pl-3">
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
