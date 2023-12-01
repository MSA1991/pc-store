import { Products } from '../types/Products';

type Props = {
  product: Products;
};

export const ProductCard = ({ product }: Props) => {
  const { image, title, price, discount } = product;
  const hasDiscount = discount > 0;

  return (
    <article className="overflow-hidden w-56 bg-black rounded-md transition-all hover:ring-2 ring-blue">
      <div className="img-filter">
        <img
          className="w-full aspect-square object-cover"
          src={image}
          alt={title}
        />
      </div>

      <div className="flex flex-col h-24 justify-between mt-2 p-2">
        <h2>{title}</h2>

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
      </div>
    </article>
  );
};
