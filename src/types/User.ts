import { CartProducts, Products } from './Products';

export type User = {
  name: string;
  email: string;
  id: string;
  photo: string | null;
};

export type UserState = {
  currentUser: User | null;
  favorites: Products[];
  cart: CartProducts[];
};

export type UserDataTitle = 'cart' | 'favorites';
export type UserData<T extends UserDataTitle> = T extends 'cart'
  ? CartProducts[]
  : Products[];
