import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion as m, AnimatePresence } from 'framer-motion';

import { AnimatedPage } from './AnimatedPage';
import { useGetProductQuery } from '../redux/storeApi';
import { Button } from '../components/UI/Button';
import { Price } from '../components/Price';
import { RatingStars } from '../components/UI/RatingStars';
import { ProductSkeleton } from '../components/Skeletons/ProductSkeleton';

export const Product = () => {
  const { products = '', product = '' } = useParams();
  const { data, isLoading } = useGetProductQuery({ products, product });
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    setCurrentImage(data?.images[0] || '');
  }, [data]);

  const handleChangeCurrentImage = (img: string) => {
    setCurrentImage(img);
  };

  return (
    <AnimatedPage>
      <div>
        {isLoading && <ProductSkeleton />}

        {data && (
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-2 sm:gap-5 w-full md:w-2/5">
              <AnimatePresence mode="wait">
                <m.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="filter-img"
                >
                  <img
                    src={currentImage}
                    alt="current-product-image"
                    className="square-img rounded-md"
                  />
                </m.div>
              </AnimatePresence>

              <ul className="grid grid-cols-3 gap-2 sm:gap-5">
                {data.images.map((img, i) => (
                  <li
                    key={i}
                    className="filter-img cursor-pointer hover-border rounded-md overflow-hidden"
                    onClick={() => handleChangeCurrentImage(img)}
                  >
                    <img
                      src={img}
                      alt={`product-image-${i}`}
                      className="square-img"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-3/5">
              <h2 className="font-bold text-lg md:text-xl">{data.title}</h2>

              <Price price={data.price} discount={data.discount} />

              <div className="flex items-center gap-2">
                {data.rating}

                <RatingStars rating={data.rating} />

                <span className="text-light-gray">
                  ({data.reviews} ratings)
                </span>
              </div>

              <div className="my-2 md:my-5 leading-none">
                <h3 className="font-bold text-base lg:text-lg">
                  Specifications:
                </h3>

                <ul className="flex flex-col gap-2 mt-2">
                  {Object.entries(data.specifications).map(([spec, value]) => (
                    <li key={spec} className="flex text-sm lg:text-base">
                      <div>{spec}</div>
                      <div className="w-2 grow mx-1 border-b-2 border-light-gray border-dotted -translate-y-1"></div>
                      <div>{value}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-5 mb-12">
                <Button text="Add to Cart" wFull />
                <Button text="Add to Favorite" wFull />
              </div>

              <Link
                to="/"
                className="text-light-gray text-xs hover-text mt-auto ml-auto"
              >
                HOME
              </Link>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
