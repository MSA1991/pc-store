import { useMemo } from 'react';
import { useGetProductsQuery } from '../redux/storeApi';
import { Link } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import Highlighter from 'react-highlight-words';
import { Price } from './Price';
import { SearchedProductsSkeleton } from './Skeletons/SearchedProductsSkeleton';

type Props = {
  query: string;
};

const MAX_NUMBER_OF_PRODUCTS = 20;

export const SearchedProducts = ({ query }: Props) => {
  const { data, isLoading } = useGetProductsQuery();

  const foundProducts = useMemo(() => {
    if (!data) return [];

    const formattedQuery = query.toLowerCase().trim();

    return data
      .filter(({ title }) => title.toLowerCase().includes(formattedQuery))
      .slice(0, MAX_NUMBER_OF_PRODUCTS);
  }, [query, data]);

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="max-w-[444px] max-h-80 overflow-y-auto absolute top-12 sm:top-16 left-0.5 right-0.5 mr-auto ml-auto rounded-md p-2 bg-gray ring-2 ring-light-gray z-20"
    >
      {isLoading && <SearchedProductsSkeleton />}

      {foundProducts.length > 0 && (
        <ul className="flex flex-col gap-2">
          {foundProducts.map(
            ({ image, price, discount, title, categoryId, id }) => (
              <li key={id}>
                <Link
                  to={`categories/${categoryId}/${id}`}
                  className="flex gap-2 sm:gap-5 rounded-md overflow-hidden hover-border bg-black"
                >
                  <div className="filter-img w-28">
                    <img
                      src={image}
                      alt={title}
                      className="square-img"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <Highlighter
                      highlightClassName="bg-cayn"
                      searchWords={query.split(' ')}
                      textToHighlight={title}
                      className="my-2 block font-bold"
                    />
                    <Price price={price} discount={discount} />
                  </div>
                </Link>
              </li>
            )
          )}
        </ul>
      )}

      {foundProducts.length === 0 && !isLoading && (
        <p className="font-bold text-lg">No result</p>
      )}
    </m.div>
  );
};
