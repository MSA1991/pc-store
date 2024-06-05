type Props = {
  price: number;
  discount: number;
};

export const Price = ({ price, discount }: Props) => (
  <div className="text-blue sm:text-lg font-bold">
    {discount > 0 ? (
      <p className="flex gap-2">
        ${price - discount}
        <span className="text-light-gray line-through decoration-2">
          ${price}
        </span>{' '}
      </p>
    ) : (
      <p>${price}</p>
    )}
  </div>
);
