import { Link } from 'react-router-dom';
import { Products } from '../types/Products';
import { Price } from './Price';

type Props = {
  product: Products;
};

export const ProductCard = ({ product }: Props) => {
  const { image, title, price, discount, categoryId, id } = product;

  return (
    <Link
      to={`/categories/${categoryId}/${id}`}
      className="overflow-hidden block dark-item hover-border"
    >
      <div className="filter-img">
        <img className="square-img" src={image} alt={title} loading="lazy" />
      </div>

      <div className="flex flex-col h-28 justify-between mt-2 p-2 font-bold">
        <h2>{title}</h2>

        <Price price={price} discount={discount} />
      </div>
    </Link>
  );
};
