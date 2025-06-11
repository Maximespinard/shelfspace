import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/shadcn/button';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 md:h-20 backdrop-blur-sm bg-gradient-to-b from-black/30 to-transparent border-b border-white/90">
      <div className="h-full max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold tracking-tight text-white">
          ShelfSpace
        </Link>
        <nav className="space-x-4">
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
