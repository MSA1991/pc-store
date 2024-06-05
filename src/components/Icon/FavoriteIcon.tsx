import { AnimatePresence, motion as m } from 'framer-motion';

type Props = {
  isFavorite: boolean;
  blueColor?: boolean;
};

export const FavoriteIcon = ({ isFavorite, blueColor }: Props) => {
  const initialColor = blueColor ? '#8085ff' : '#1B1B1F';
  const activeColor = blueColor ? '#B0B5FF' : '#FFF5D9';

  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={initialColor}
        fill="none"
        d="M1,8.4 C1,4 4.5,3 6.5,3 C9,3 11,5 12,6.5 C13,5 15,3 17.5,3 C19.5,3 23,4 23,8.4 C23,15 12,21 12,21 C12,21 1,15 1,8.4 Z"
      ></path>

      <AnimatePresence initial={false}>
        {isFavorite && (
          <m.path
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{
              pathLength: 1,
              fillOpacity: 1,
              transition: { fillOpacity: { delay: 0.3 } },
            }}
            exit={{
              pathLength: 0,
              fillOpacity: 0,
              transition: { pathLength: { delay: 0.3 } },
            }}
            transition={{ duration: 0.3, fillOpacity: { delay: 0.3 } }}
            stroke={activeColor}
            fill={activeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1,8.4 C1,4 4.5,3 6.5,3 C9,3 11,5 12,6.5 C13,5 15,3 17.5,3 C19.5,3 23,4 23,8.4 C23,15 12,21 12,21 C12,21 1,15 1,8.4 Z"
          ></m.path>
        )}
      </AnimatePresence>
    </svg>
  );
};
