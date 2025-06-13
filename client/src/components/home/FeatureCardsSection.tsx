import Section from '@/components/ui/base/Section';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import { LucideBookOpen, LucideSearch, LucideShieldCheck } from 'lucide-react';

const features = [
  {
    icon: LucideBookOpen,
    title: 'Catalog with ease',
    description: 'Add items in seconds with cover photos and tags.',
    delay: 0.1,
  },
  {
    icon: LucideSearch,
    title: 'Find anything fast',
    description: 'Use smart filters by genre, date, or keyword.',
    delay: 0.2,
  },
  {
    icon: LucideShieldCheck,
    title: 'Own your data',
    description: 'Your collection stays private and secure.',
    delay: 0.3,
  },
];

const FeatureCardsSection = () => {
  return (
    <Section className="py-24 text-center">
      <MotionDiv delay={0}>
        <h2 className="text-4xl font-bold text-white mb-16">Why ShelfSpace?</h2>
      </MotionDiv>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description, delay }, index) => (
          <MotionDiv
            key={index}
            delay={delay}
            className="relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition shadow-xl"
          >
            <div className="mb-4 mx-auto flex items-center justify-center size-12 rounded-full bg-white/10 text-white">
              <Icon className="size-6" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </MotionDiv>
        ))}
      </div>
    </Section>
  );
};

export default FeatureCardsSection;
