import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className = '' }: Props) => {
  return (
    <section
      className={`w-full px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
