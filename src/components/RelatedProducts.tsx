import { Products } from '../types/Products';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './Skeletons/ProductCardSkeleton';

type Props = {
  title: string;
  products: Products[];
  isLoading: boolean;
};

const NUMBER_OF_PRODUCTS = 4;

export const RelatedProducts = ({ title, products, isLoading }: Props) => (
  <article className="p-2 sm:p-5 ring-2 ring-black ring-inset rounded-md">
    <h3 className="section-title mb-5 text-center md:text-left">{title}</h3>

    <ul className="grid-container">
      {isLoading &&
        [...Array(NUMBER_OF_PRODUCTS)].map((_, i) => (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        ))}

      {products.slice(0, NUMBER_OF_PRODUCTS).map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  </article>
);
