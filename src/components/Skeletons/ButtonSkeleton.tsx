type Props = {
  wFull?: boolean;
};

export const ButtonSkeleton = ({ wFull }: Props) => (
  <div
    className={`${
      wFull ? 'w-full' : 'w-32 lg:w-40'
    } skeleton animation-skeleton h-9 lg:h-10`}
  ></div>
);
