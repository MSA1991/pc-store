import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion as m, AnimatePresence } from 'framer-motion';
import { AnimatedPage } from '../pages/AnimatedPage';
import { useGetProductQuery } from '../redux/storeApi';
import { Button } from './UI/Button';
import { Price } from './Price';
import { RatingStars } from './RatingStars';

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
      <>
        {data && (
          <div className="flex gap-5">
            <div className="flex flex-col gap-5 w-2/5 shrink-0">
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

              <ul className="grid grid-cols-3 gap-5">
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

            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-bold text-xl">{data.title}</h2>

              <Price price={data.price} discount={data.discount} />

              <div className="flex items-center gap-2 leading-none">
                {data.rating}

                <RatingStars rating={data.rating} />

                <span className="font-extralight text-sm ">
                  ({data.reviews} ratings)
                </span>
              </div>

              <div className="my-5 leading-none">
                <span className="font-bold">Specifications:</span>

                <div className="flex mt-5 w-96 justify-between">
                  <ul className="flex flex-col gap-2 flex-grow">
                    {Object.keys(data.characteristics).map((spec, i) => (
                      <li
                        key={i}
                        className="flex after:mx-1 after:flex-grow after:border-b-2 after:border-light-gray after:border-dotted"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-col gap-2">
                    {Object.values(data.characteristics).map((value, i) => (
                      <li key={i}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-5 w-96">
                <Button text="Add to Cart" />
                <Button text="Add to Favorite" />
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
      </>
    </AnimatedPage>
  );
};

// after:ml-1 after:w-10 after:inline-block after:border-b-2 after:border-light-gray after:border-dotted
