import Section from '@/components/ui/base/Section';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import { Button } from '@/components/ui/shadcn/button';
import { Link } from 'react-router-dom';

const BottomCtaSection = () => {
  return (
    <Section className="bg-gradient text-center py-24">
      <div className="max-w-xl mx-auto space-y-6">
        <MotionDiv variant="fadeInUp" delay={0}>
          <h2 className="text-4xl font-bold text-white">
            Ready to start your collection?
          </h2>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.1}>
          <p className="text-muted-foreground text-lg">
            It takes less than a minute to sign up and it’s free forever.
          </p>
        </MotionDiv>

        <MotionDiv variant="fadeInUp" delay={0.2}>
          <Link to="/register">
            <Button variant="signupCta" size={'lg'}>
              Create my account for free
            </Button>
          </Link>
        </MotionDiv>
      </div>
    </Section>
  );
};

export default BottomCtaSection;
