import { Products } from './Products';

export type User = {
  name: string;
  email: string;
  photo: string | null;
};

export type UserState = {
  currentUser: User | null;
  favorite: Products[];
  cart: Products[];
};
