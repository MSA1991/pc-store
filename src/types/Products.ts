export type Products = {
  id: string;
  title: string;
  categoryId: string;
  price: number;
  discount: number;
  image: string;
};

export type CartProducts = Products & {
  quantity: number;
};
