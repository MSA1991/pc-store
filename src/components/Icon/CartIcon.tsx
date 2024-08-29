import { m, AnimatePresence } from 'framer-motion';

type Props = {
  isInCart: boolean;
};

export const CartIcon = ({ isInCart }: Props) => {
  return (
    <svg className="w-6 text-black" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="9" cy="21" r="1" stroke="currentColor" />
      <circle cx="20" cy="21" r="1" stroke="currentColor" />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        fill="none"
        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
      ></path>

      <AnimatePresence initial={false}>
        {isInCart && (
          <>
            <m.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1.2 }}
              exit={{ pathLength: 0 }}
              cx="9"
              cy="21"
              r="1"
              stroke="#FFF5D9"
            />
            <m.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1.2 }}
              exit={{ pathLength: 0 }}
              cx="20"
              cy="21"
              r="1"
              stroke="#FFF5D9"
            />

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
              stroke="#FFF5D9"
              fill="#FFF5D9"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            ></m.path>
          </>
        )}
      </AnimatePresence>
    </svg>
  );
};
