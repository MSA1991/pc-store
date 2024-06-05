import { clsx } from 'clsx';

type Props = {
  wFull?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  children: JSX.Element | string;
};

export const Button = ({
  wFull,
  onClick,
  type = 'button',
  children,
}: Props) => (
  <button
    onClick={onClick}
    type={type}
    className={clsx(
      'h-10 text-black text-sm lg:text-base font-bold rounded-md bg-blue hover:bg-cayn transition-colors grid place-items-center',
      {
        'w-full': wFull,
        'w-32 sm:w-40': !wFull,
      }
    )}
  >
    {children}
  </button>
);
