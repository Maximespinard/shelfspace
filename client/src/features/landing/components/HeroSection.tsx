import Section from '@/components/ui/base/Section';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import { Button } from '@/components/ui/shadcn/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Section className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col-reverse md:flex-row items-center justify-center gap-16 pt-16 md:pt-0 relative">
      {/* LEFT */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <MotionDiv variant="fadeInUp" delay={0}>
          <p className="text-caption uppercase tracking-widest text-muted-foreground mb-2">
            Built for collectors
          </p>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.1}>
          <h1 className="text-display">Bring your collections to life</h1>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.2}>
          <p className="text-hero-sub">
            Whether you're passionate about books, vinyl records, or works of
            art, ShelfSpace is the simple and elegant tool to catalog, manage,
            and share all your treasures.
          </p>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.3}>
          <Link to="/register">
            <Button variant="cta">Start my collection</Button>
          </Link>
        </MotionDiv>
      </div>

      {/* RIGHT */}
      <MotionDiv
        variant="fadeInRight"
        delay={0.4}
        className="flex-1 w-full mt-24 md:mt-0"
      >
        <div className="w-full max-w-[500px] aspect-video mx-auto">
          <img
            src="/placeholder-hero.webp"
            alt="Shelf preview"
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
      </MotionDiv>

      <MotionDiv
        variant="fadeInUp"
        delay={0.5}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-6 animate-bounce text-white opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </MotionDiv>
    </Section>
  );
};

export default HeroSection;
