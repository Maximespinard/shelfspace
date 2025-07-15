import { useMediaQuery } from 'usehooks-ts';

/**
 * Custom hook that provides consistent responsive breakpoints across the application
 * 
 * Breakpoints:
 * - Mobile: <= 639px
 * - Tablet: 640px - 1023px  
 * - Desktop: >= 1024px
 */
export const useResponsiveBreakpoints = () => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  return { 
    isMobile, 
    isTablet, 
    isDesktop 
  };
};