import { motion as m, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

type Props = {
  label: string;
  checked: boolean;
  onToggleChecked: () => void;
};

export const Checkbox = memo(({ label, checked, onToggleChecked }: Props) => (
  <div
    className="w-fit flex gap-2 items-center cursor-pointer"
    onClick={onToggleChecked}
  >
    <svg
      className={'h-4 w-4 text-blue rounded-sm bg-black transition-colors'}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <AnimatePresence>
        {checked && (
          <m.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            exit={{ opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.3 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        )}
      </AnimatePresence>
    </svg>

    <span>{label}</span>
  </div>
));
