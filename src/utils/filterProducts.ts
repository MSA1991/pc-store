import { Products } from '../types/Products';
import { ProductsFilter, SortingOptions } from '../types/ProductsFilter';

export const getFilteredProducts = (
  products: Products[],
  filter: ProductsFilter
) => {
  let filteredProducts = [...products];
  const {
    maxPriceInCategory,
    minPriceInCategory,
    minPrice,
    maxPrice,
    onlySale,
    sortingByPrice,
  } = filter;

  if (
    (minPrice > 0 && minPrice > minPriceInCategory) ||
    (maxPrice > 0 && maxPrice < maxPriceInCategory)
  ) {
    filteredProducts = filteredProducts.filter(({ price, discount }) => {
      const fullPrice = price - discount;

      return fullPrice >= minPrice && fullPrice <= maxPrice;
    });
  }

  if (onlySale) {
    filteredProducts = filteredProducts.filter(({ discount }) => discount > 0);
  }

  if (sortingByPrice) {
    filteredProducts.sort((a, b) => {
      return sortingByPrice === SortingOptions.ASC
        ? a.price - b.price
        : b.price - a.price;
    });
  }

  return filteredProducts;
};
