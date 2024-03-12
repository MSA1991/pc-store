type Props = {
  text: string;
  wFull?: boolean;
  onClick?: () => void;
};

export const Button = ({ text, wFull, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={`${
      wFull ? 'w-full' : 'w-32 sm:w-40'
    } text-black text-sm sm:text-base font-bold p-2 rounded-md bg-blue hover:bg-cayn transition-colors`}
  >
    {text}
  </button>
);
