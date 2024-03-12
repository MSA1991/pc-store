type Props = {
  wFull?: boolean;
};

export const ButtonSkeleton = ({ wFull }: Props) => (
  <div
    className={`${
      wFull ? 'w-full' : 'w-32 sm:w-40'
    } skeleton animation-skeleton h-9 sm:h-10`}
  ></div>
);
