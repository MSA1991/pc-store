import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserState } from '../types/User';

const initialState: UserState = {
  currentUser: null,
  favorite: [],
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
    removeUser: () => {
      return initialState;
    },
  },
});

export const { setUser, removeUser, setUserPhoto } = userSlice.actions;

export default userSlice.reducer;
