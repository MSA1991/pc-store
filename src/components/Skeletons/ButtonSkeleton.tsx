import { clsx } from 'clsx';

type Props = {
  wFull?: boolean;
};

export const ButtonSkeleton = ({ wFull }: Props) => (
  <div
    className={clsx('dark-item animation-skeleton h-9 sm:h-10', {
      'w-full': wFull,
      'w-32 sm:w-40': !wFull,
    })}
  ></div>
);
