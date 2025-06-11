import { useLocation } from 'react-router-dom';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const GradientWrapper = ({ children }: Props) => {
  const location = useLocation();

  const isPublicRoute = ['/', '/login', '/register'].includes(
    location.pathname
  );

  return (
    <div
      className={
        isPublicRoute
          ? 'min-h-screen bg-gradient text-foreground'
          : 'min-h-screen bg-background text-foreground'
      }
    >
      {children}
    </div>
  );
};

export default GradientWrapper;
