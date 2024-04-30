import { clsx } from 'clsx';
import { IconType } from 'react-icons';

type Props = {
  text?: string;
  wFull?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  icon?: IconType;
};

export const Button = ({
  text,
  wFull,
  onClick,
  type = 'button',
  icon: Icon,
}: Props) => (
  <button
    onClick={onClick}
    type={type}
    className={clsx(
      'h-10 text-black text-sm sm:text-base font-bold p-2 rounded-md bg-blue hover:bg-cayn transition-colors grid place-items-center',
      {
        'w-full': wFull,
        'w-32 sm:w-40': !wFull,
      }
    )}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {text}
  </button>
);
