import { Products } from '../types/Products';
import { ProductsFilter, SortingOptions } from '../types/ProductsFilter';

export const filterProducts = (
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
    minPrice > minPriceInCategory ||
    (maxPrice < maxPriceInCategory && maxPrice > minPriceInCategory)
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
      if (sortingByPrice === SortingOptions.ASC) {
        return a.price - b.price;
      }

      return b.price - a.price;
    });
  }

  return filteredProducts;
};
