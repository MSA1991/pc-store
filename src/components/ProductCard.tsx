import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Products } from '../types/Products';
import { Price } from './Price';

import 'react-lazy-load-image-component/src/effects/blur.css';

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
      <LazyLoadImage
        className="square-img"
        src={image}
        alt={title}
        width="100%"
        height="100%"
        effect="blur"
      />

      <div className="flex flex-col h-28 justify-between mt-2 p-2 font-bold">
        <h2>{title}</h2>

        <Price price={price} discount={discount} />
      </div>
    </Link>
  );
};
