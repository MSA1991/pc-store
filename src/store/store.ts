import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from './storeApi';
import filterReducer from './filterSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    filter: filterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
