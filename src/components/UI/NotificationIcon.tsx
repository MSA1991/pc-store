import { motion as m, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  quantity?: number;
};

export const NotificationIcon = ({ icon: Icon, quantity }: Props) => {
  return (
    <div className="relative">
      <Icon className="icon" />

      <AnimatePresence>
        {quantity && (
          <m.div
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={quantity}
                initial={{ opacity: 0, scale: 0.5, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 6 }}
                transition={{ duration: 0.3 }}
              >
                {quantity}
              </m.div>
            </AnimatePresence>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
