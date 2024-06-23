import { useCallback, useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilters } from '../store/filterSlice';
import { Checkbox } from './UI/Checkbox';
import { Button } from './UI/Button';
import { Select } from './UI/Select';
import { DoubleRangeSlider } from './UI/DoubleRangeSlider';
import {
  FilterKey,
  ProductsFilter,
  SortingOptions,
} from '../types/ProductsFilter';

const options: SortingOptions[] = Object.values(SortingOptions);

export const Filter = () => {
  const filter = useAppSelector((state) => state.filter);
  const { minPrice, maxPrice, minPriceInCategory, maxPriceInCategory } = filter;

  const [productsFilter, setProductsFilter] = useState<ProductsFilter>(filter);
  const { onlySale, sortingByPrice } = productsFilter;

  const dispatch = useAppDispatch();

  useEffect(() => {
    setProductsFilter(filter);
  }, [filter]);

  const filterChange = (key: FilterKey, value: ProductsFilter[FilterKey]) => {
    setProductsFilter((_productsFilter) => ({
      ..._productsFilter,
      [key]: value,
    }));
  };

  const handleChangeSortingByPrice = useCallback((option: SortingOptions) => {
    filterChange('sortingByPrice', option);
  }, []);

  const handleToggleOnlySale = useCallback(() => {
    filterChange('onlySale', !onlySale);
  }, [onlySale]);

  const handleChangeMinPrice = useCallback((value: number) => {
    filterChange('minPrice', value);
  }, []);

  const handleChangeMaxPrice = useCallback((value: number) => {
    filterChange('maxPrice', value);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilters(productsFilter));
  };

  return (
    <m.div
      initial={{ opacity: 0, x: -100, display: 'none' }}
      animate={{
        opacity: 1,
        x: 0,
        display: 'block',
        transition: { delay: 0.3 },
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="section-fixed-padding h-80"
    >
      <form
        className="h-full flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <DoubleRangeSlider
            presetMinValue={minPrice}
            presetMaxValue={maxPrice}
            minValue={minPriceInCategory}
            maxValue={maxPriceInCategory}
            onChangeMinValue={handleChangeMinPrice}
            onChangeMaxValue={handleChangeMaxPrice}
          />

          <Select
            options={options}
            placeholder="Sort by price"
            selected={sortingByPrice}
            onChangeSelected={handleChangeSortingByPrice}
          />

          <Checkbox
            label="Only Sale"
            checked={onlySale}
            onToggleChecked={handleToggleOnlySale}
          />
        </div>

        <Button type="submit" wFull>
          Apply
        </Button>
      </form>
    </m.div>
  );
};
