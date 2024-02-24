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
      wFull ? 'w-full' : 'w-32 lg:w-40'
    } text-black text-sm lg:text-base font-bold p-2 rounded-md bg-blue hover:bg-cayn transition-colors`}
  >
    {text}
  </button>
);
