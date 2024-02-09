export type Product = {
  id: string;
  title: string;
  price: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  specifications: Record<string, string>;
};
