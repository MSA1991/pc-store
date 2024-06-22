import { motion, MotionConfig } from 'framer-motion';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export const BurgerButton = ({ isOpen, onToggle }: Props) => (
  <MotionConfig
    transition={{
      duration: 0.3,
    }}
  >
    <motion.button
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      onClick={onToggle}
      className="w-6 h-6 grid place-items-center"
    >
      <div className="relative w-6 h-4 z-50">
        <motion.span
          variants={VARIANTS.top}
          className="absolute top-0 left-0 h-1 w-full bg-white rounded-full"
          style={{ y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute top-1/2 left-0 h-1 w-full bg-white rounded-full"
          style={{ y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute bottom-0 left-0 h-1 w-1/2 bg-white rounded-full"
          style={{ y: '50%' }}
        />
      </div>
    </motion.button>
  </MotionConfig>
);

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['0%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '0%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      bottom: ['0%', '50%'],
      opacity: 0,
    },
    closed: {
      bottom: ['50%', '0%'],
      opacity: 1,
    },
  },
};
