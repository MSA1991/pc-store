import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';

import { Price } from '../components/Price';
import { RatingStars } from '../components/UI/RatingStars';
import { ProductSkeleton } from '../components/Skeletons/ProductSkeleton';
import { RelatedProducts } from '../components/RelatedProducts';
import { UserActionButtons } from '../components/UserActionButtons';
import { AnimatedPage } from './AnimatedPage';
import { useGetProductQuery, useGetProductsQuery } from '../store/storeApi';

import 'react-lazy-load-image-component/src/effects/blur.css';

export const ProductPage = () => {
  const { products = '', product = '' } = useParams();
  const { data: dataProductsList, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = useGetProductQuery({
    products,
    product,
  });

  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (errorProduct) {
      toast('Product not found');
      navigate('/error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorProduct]);

  useEffect(() => {
    setCurrentImage(dataProduct?.images[0] || '');
  }, [dataProduct]);

  const handleChangeCurrentImage = (img: string) => {
    setCurrentImage(img);
  };

  const relatedProducts = useMemo(() => {
    if (!dataProductsList) return [];

    return dataProductsList.filter(
      ({ categoryId, id }) => categoryId === products && id !== product
    );
  }, [dataProductsList, products, product]);

  const currentProduct = useMemo(() => {
    return dataProductsList?.find(({ id }) => dataProduct?.id === id);
  }, [dataProductsList, dataProduct]);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5">
        {isLoadingProduct && <ProductSkeleton />}

        {dataProduct && (
          <div className="flex flex-col md:flex-row gap-5 mb-5">
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
                {dataProduct.images.map((img, i) => (
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
              <h2 className="section-title">{dataProduct.title}</h2>

              <Price
                price={dataProduct.price}
                discount={dataProduct.discount}
              />

              <div className="flex items-center gap-2">
                <span>{dataProduct.rating.toFixed(1)}</span>

                <RatingStars rating={dataProduct.rating} />

                <span className="text-light-gray leading-none">
                  ({dataProduct.reviews} ratings)
                </span>
              </div>

              <div className="my-2 md:my-5 leading-none">
                <h3 className="font-bold text-base lg:text-lg">
                  Specifications:
                </h3>

                <ul className="flex flex-col gap-2 mt-2">
                  {Object.entries(dataProduct.specifications).map(
                    ([spec, value]) => (
                      <li
                        key={spec}
                        className="flex gap-1 text-sm lg:text-base"
                      >
                        <div>{spec}</div>
                        <div className="w-10 sm:w-4 grow border-b-2 border-light-gray border-dotted -translate-y-1"></div>
                        <div className="text-end">{value}</div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {currentProduct && <UserActionButtons product={currentProduct} />}
            </div>
          </div>
        )}

        <RelatedProducts
          title="Related products"
          isLoading={isLoadingProducts}
          products={relatedProducts}
        />
      </div>
    </AnimatedPage>
  );
};
