import { motion, type HTMLMotionProps } from 'framer-motion';

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};
interface Props extends HTMLMotionProps<'div'> {
  delay?: number;
  variant?: keyof typeof variants;
}

const MotionDiv = ({
  children,
  delay = 0.2,
  variant = 'fadeInUp',
  ...props
}: Props) => {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
