import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '@/components/ui/shadcn/button';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  
  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 md:h-20 backdrop-blur-sm bg-gradient-to-b from-black/30 to-transparent border-b border-white/90">
      <div className="h-full max-w-screen-xl mx-auto px-4 flex items-center relative">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img
            src="/shelfspace-icon-white.svg"
            alt="ShelfSpace"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* ShelfSpace text in absolute center of screen (hidden on mobile) */}
        {!isMobile && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-3xl font-bold tracking-tight text-white">
              ShelfSpace
            </Link>
          </div>
        )}
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Login/Signup on the right */}
        <nav className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="loginCta" size={'lg'}>
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="signupCta" size={'lg'}>
              Sign Up
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
