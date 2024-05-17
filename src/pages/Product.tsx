import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion as m, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AnimatedPage } from './AnimatedPage';
import { useGetProductQuery, useGetProductsQuery } from '../redux/storeApi';
import { Button } from '../components/UI/Button';
import { Price } from '../components/Price';
import { RatingStars } from '../components/UI/RatingStars';
import { ProductSkeleton } from '../components/Skeletons/ProductSkeleton';
import { RelatedProducts } from '../components/RelatedProducts';

import 'react-lazy-load-image-component/src/effects/blur.css';

export const Product = () => {
  const { products = '', product = '' } = useParams();
  const { data: productsList, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  const { data, isLoading } = useGetProductQuery({ products, product });
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    setCurrentImage(data?.images[0] || '');
  }, [data]);

  const handleChangeCurrentImage = (img: string) => {
    setCurrentImage(img);
  };

  const relatedProducts = useMemo(() => {
    if (!productsList) return [];

    return productsList.filter(
      ({ categoryId, id }) => categoryId === products && id !== product
    );
  }, [productsList, products, product]);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5">
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
                  className="w-full aspect-square rounded-md overflow-hidden"
                >
                  <LazyLoadImage
                    src={currentImage}
                    alt="current-product-image"
                    className="square-img"
                    width="100%"
                    height="100%"
                    effect="blur"
                  />
                </m.div>
              </AnimatePresence>

              <ul className="grid grid-cols-3 gap-2 sm:gap-5">
                {data.images.map((img, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover-border rounded-md overflow-hidden"
                    onClick={() => handleChangeCurrentImage(img)}
                  >
                    <LazyLoadImage
                      src={img}
                      alt={`product-image-${i}`}
                      className="square-img"
                      width="100%"
                      height="100%"
                      effect="blur"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-3/5">
              <h2 className="section-title">{data.title}</h2>

              <Price price={data.price} discount={data.discount} />

              <div className="flex items-center gap-2">
                {data.rating.toFixed(1)}

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
                    <li key={spec} className="flex gap-1 text-sm lg:text-base">
                      <div>{spec}</div>
                      <div className="w-4 grow border-b-2 border-light-gray border-dotted -translate-y-1"></div>
                      <div className="text-end">{value}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-5">
                <Button text="Add to Cart" wFull />
                <Button text="Add to Favorite" wFull />
              </div>
            </div>
          </div>
        )}

        <RelatedProducts
          text="Related products"
          isLoading={isLoadingProducts}
          products={relatedProducts}
        />
      </div>
    </AnimatedPage>
  );
};
