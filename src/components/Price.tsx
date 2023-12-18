type Props = {
  price: number;
  discount: number;
};

export const Price = ({ price, discount }: Props) => {
  const hasDiscount = discount > 0;

  return (
    <div className="text-blue text-lg font-bold">
      {hasDiscount ? (
        <p className="flex gap-2">
          {price - discount}$
          <span className="text-light-gray line-through decoration-2">
            {price}$
          </span>{' '}
        </p>
      ) : (
        <p>{price}$</p>
      )}
    </div>
  );
};
