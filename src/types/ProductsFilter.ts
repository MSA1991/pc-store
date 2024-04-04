export enum SortingOptions {
  ASC = 'Low to high',
  DESC = 'High to low',
}

export type ProductsFilter = {
  minPriceInCategory: number;
  maxPriceInCategory: number;
  minPrice: number;
  maxPrice: number;
  onlySale: boolean;
  sortingByPrice: SortingOptions | null;
};

export type FilterKey = keyof ProductsFilter;
