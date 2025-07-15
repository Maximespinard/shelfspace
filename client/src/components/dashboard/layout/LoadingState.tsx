import LoadingSpinner from '@/components/ui/animated/LoadingSpinner';
import MotionDiv from '@/components/ui/animated/MotionDiv';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = 'Loading your collection...' }: LoadingStateProps) => {
  return (
    <MotionDiv
      variant="fadeInUp"
      className="flex flex-col items-center justify-center min-h-[400px] gap-6"
    >
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </MotionDiv>
  );
};

export default LoadingState;