import { clsx } from 'clsx';

type Props = {
  text: string;
  wFull?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
};

export const Button = ({ text, wFull, onClick, type = 'button' }: Props) => (
  <button
    onClick={onClick}
    type={type}
    className={clsx(
      'text-black text-sm sm:text-base font-bold p-2 rounded-md bg-blue hover:bg-cayn transition-colors',
      {
        'w-full': wFull,
        'w-32 sm:w-40': !wFull,
      }
    )}
  >
    {text}
  </button>
);
