import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserState } from '../types/User';
import { CartProducts, Products } from '../types/Products';

const initialState: UserState = {
  currentUser: null,
  favorites: [],
  cart: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    setUserPhoto: (state, { payload }: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.photo = payload;
      }
    },
    setFavorites: (state, { payload }: PayloadAction<Products[]>) => {
      state.favorites = payload;
    },
    setCart: (state, { payload }: PayloadAction<CartProducts[]>) => {
      state.cart = payload;
    },
    toggleProductInFavorites: (state, { payload }: PayloadAction<Products>) => {
      const favorites = state.favorites;
      const isFavorite = favorites.some(({ id }) => id === payload.id);

      state.favorites = isFavorite
        ? favorites.filter(({ id }) => id !== payload.id)
        : [...favorites, payload];
    },
    toggleProductInCart: (state, { payload }: PayloadAction<CartProducts>) => {
      const cart = state.cart;
      const isFavorite = cart.some(({ id }) => id === payload.id);

      state.cart = isFavorite
        ? cart.filter(({ id }) => id !== payload.id)
        : [...cart, payload];
    },
    increaseQuantityProductInCart: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.cart = state.cart.map((product) =>
        product.id === payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    },
    decreaseQuantityProductInCart: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.cart = state.cart.map((product) =>
        product.id === payload
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
    },
    deleteUser: () => {
      return initialState;
    },
  },
});

export const {
  setUser,
  setUserPhoto,
  setFavorites,
  setCart,
  toggleProductInFavorites,
  toggleProductInCart,
  increaseQuantityProductInCart,
  decreaseQuantityProductInCart,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
