import { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Pagination, A11y, Parallax } from 'swiper/modules';

import { useGetCategoriesQuery } from '../store/storeApi';
import { SliderDirection } from '../types/SliderDirection';
import { SliderButton } from './UI/SliderButton';
import { CategorySingleSlide } from './CategorySingleSlide';
import { CategorySliderSkeleton } from './Skeletons/CategorySliderSkeleton';

import 'swiper/css';

export const CategorySlider = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleSlideChange = useCallback((direction: SliderDirection) => {
    if (direction === SliderDirection.Next) {
      swiperRef.current?.swiper.slideNext();
    } else {
      swiperRef.current?.swiper.slidePrev();
    }
  }, []);

  return (
    <>
      {isLoading && <CategorySliderSkeleton />}

      {data && (
        <article className="dark-item flex gap-5 items-center p-5">
          <div className="hidden lg:block">
            <SliderButton
              direction={SliderDirection.Prev}
              handleSlideChange={handleSlideChange}
            />
          </div>

          <Swiper
            ref={swiperRef}
            speed={600}
            parallax
            modules={[Parallax, Pagination, A11y]}
            slidesPerView={1}
            loop
            pagination={{
              el: '#pagination',
              bulletClass:
                'block w-2 h-2 rounded-full bg-blue hover:bg-cayn transition-all',
              bulletActiveClass: 'w-4',
              clickable: true,
            }}
          >
            {data.map((category, i) => (
              <SwiperSlide key={i}>
                <CategorySingleSlide category={category} />
              </SwiperSlide>
            ))}

            <div
              id="pagination"
              className="flex gap-2 absolute bottom-0 left-2/4 -translate-x-2/4 z-10"
            ></div>
          </Swiper>

          <div className="hidden lg:block">
            <SliderButton
              direction={SliderDirection.Next}
              handleSlideChange={handleSlideChange}
            />
          </div>
        </article>
      )}
    </>
  );
};
