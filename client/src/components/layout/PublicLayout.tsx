import GradientWrapper from '@/components/ui/base/GradientWrapper';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <GradientWrapper>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </GradientWrapper>
  );
};

export default PublicLayout;
