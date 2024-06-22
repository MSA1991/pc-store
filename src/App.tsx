import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { auth, database } from './firebase';
import { deleteUser, setCart, setFavorites, setUser } from './store/userSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './Routes/AppRoutes';
import { useDebounce } from './hooks/useDebounce';
import { useGetCategoriesQuery, useGetProductsQuery } from './store/storeApi';
import { UserData, UserDataTitle } from './types/User';

const DB_UPDATE_DELAY = 300;

function App() {
  const user = useAppSelector(({ user }) => user.currentUser);
  const cart = useAppSelector(({ user }) => user.cart);
  const favorites = useAppSelector(({ user }) => user.favorites);
  const debouncedCart = useDebounce(cart, DB_UPDATE_DELAY);
  const debouncedFavorites = useDebounce(favorites, DB_UPDATE_DELAY);

  const dispatch = useAppDispatch();
  const isFirstDataChange = useRef(true);

  const { error: productError } = useGetProductsQuery();
  const { error: categoryError } = useGetCategoriesQuery();
  const hasError = !!productError || !!categoryError;
  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) {
      toast('Server Error');
      navigate('/error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError]);

  const updateUserData = useCallback(
    async <T extends UserDataTitle>(title: T, data: UserData<T>) => {
      if (!user) return;

      try {
        await set(ref(database, `users/${user.id}/${title}`), data);
      } catch (error) {
        toast(`Failed to update ${title}`);
      }
    },
    [user]
  );

  useEffect(() => {
    if (isFirstDataChange.current) return;

    updateUserData('cart', cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCart]);

  useEffect(() => {
    if (isFirstDataChange.current) return;

    updateUserData('favorites', favorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFavorites]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(deleteUser());
        return;
      }

      const { displayName, email, photoURL, uid } = user;

      if (!displayName || !email) {
        return;
      }

      dispatch(
        setUser({
          name: displayName,
          photo: photoURL,
          id: uid,
          email,
        })
      );

      try {
        const snapshotFavorites = await get(
          ref(database, `users/${user.uid}/favorites`)
        );

        const snapshotCart = await get(ref(database, `users/${user.uid}/cart`));

        if (snapshotCart.val()) {
          dispatch(setCart(snapshotCart.val()));
        }

        if (snapshotFavorites.val()) {
          dispatch(setFavorites(snapshotFavorites.val()));
        }
      } catch (error) {
        toast(`Failed to update data`);
      }

      isFirstDataChange.current = false;
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
