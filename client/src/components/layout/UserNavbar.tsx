import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { logoutUserApi } from '@/features/auth/api/auth';
import { Button } from '../ui/shadcn/button';
import { handleApiError, handleApiSuccess } from '@/lib/api/error-handler';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';

const UserNavbar = () => {
 const user = useAuthStore((state) => state.user);
 const logout = useAuthStore((state) => state.logout);
 const navigate = useNavigate();

 const { isMobile } = useResponsiveBreakpoints();

 const handleLogout = async () => {
   try {
     await logoutUserApi();
   } catch (err) {
     console.warn('❌ Failed to logout from backend:', err);
     handleApiError(err, undefined, 'auth');
   } finally {
     logout();
     navigate('/login');
     handleApiSuccess("You've been logged out.");
   }
 };

 return (
   <nav className="fixed top-0 left-0 w-full border-b px-6 py-3 flex items-center bg-background z-50">
     {/* Logo on the left */}
     <div className="flex items-center">
       <img src="/shelfspace-icon.svg" alt="ShelfSpace" className="w-12 h-12" />
     </div>

     {/* Centered ShelfSpace title - absolutely positioned */}
     <div className="absolute left-1/2 transform -translate-x-1/2">
       <h1
         className={`font-bold text-primary ${
           isMobile ? 'text-lg' : 'text-2xl'
         }`}
       >
         ShelfSpace
       </h1>
     </div>

     {/* Logout on the right */}
     <div className="flex items-center gap-4 ml-auto">
       {!isMobile && (
         <span className="text-sm text-muted-foreground">{user?.email}</span>
       )}
       <Button variant="outline" onClick={handleLogout}>
         Logout
       </Button>
     </div>
   </nav>
 );
};

export default UserNavbar;