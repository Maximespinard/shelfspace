import { Sparkles } from 'lucide-react';
import MotionDiv from '../../ui/animated/MotionDiv';

const EmptyState = () => {
  return (
    <MotionDiv
      variant="fadeInUp"
      delay={0.1}
      className="border rounded-xl px-6 py-12 text-center text-muted-foreground bg-card shadow-sm"
    >
      <div className="flex justify-center mb-4">
        <Sparkles className="w-10 h-10 text-primary animate-pulse" />
      </div>
      <p className="text-2xl font-bold text-foreground mb-2">
        Your shelf is empty
      </p>
      <p className="text-sm text-muted-foreground">
        It looks like you haven’t added any items yet.
      </p>
      <p className="mt-4 text-sm">
        Start by clicking{' '}
        <span className="text-primary font-medium">“Add New Item”</span> above
        👆
      </p>
    </MotionDiv>
  );
};

export default EmptyState;
