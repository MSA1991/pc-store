import { useCallback, useEffect, useRef } from 'react';
import { get, ref, set } from 'firebase/database';
import { auth, database } from './firebase';
import { deleteUser, setCart, setFavorites, setUser } from './store/userSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './Routes/AppRoutes';
import { useDebounce } from './hooks/useDebounce';
import { CartProducts, Products } from './types/Products';

const DB_UPDATE_DELAY = 300;

function App() {
  const user = useAppSelector(({ user }) => user.currentUser);
  const cart = useAppSelector(({ user }) => user.cart);
  const favorites = useAppSelector(({ user }) => user.favorites);
  const debouncedCart = useDebounce(cart, DB_UPDATE_DELAY);
  const debouncedFavorites = useDebounce(favorites, DB_UPDATE_DELAY);

  const dispatch = useAppDispatch();
  const isFirstChange = useRef(true);

  const updateUserData = useCallback(
    async (title: 'cart' | 'favorites', data: CartProducts[] | Products[]) => {
      try {
        await set(ref(database, `users/${user?.id}/${title}`), data);
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  useEffect(() => {
    if (isFirstChange.current || !user) return;

    updateUserData('cart', cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCart]);

  useEffect(() => {
    if (isFirstChange.current || !user) return;

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

        isFirstChange.current = false;
      } catch (error) {
        console.log(error);
      }
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
