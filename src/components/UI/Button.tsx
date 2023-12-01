type Props = {
  text: string;
};

export const Button = ({ text }: Props) => {
  return (
    <button className="w-full text-black font-bold p-2 rounded-md bg-blue hover:bg-cayn transition-colors">
      {text}
    </button>
  );
};
