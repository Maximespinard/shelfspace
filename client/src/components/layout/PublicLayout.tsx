import { type ReactNode } from 'react';
import GradientWrapper from '@/components/ui/base/GradientWrapper';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

const PublicLayout = ({ children }: Props) => {
  return (
    <GradientWrapper>
      <Navbar />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </GradientWrapper>
  );
};

export default PublicLayout;
