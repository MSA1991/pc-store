import { useEffect, useState } from 'react';
import { deleteUser, signOut } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeUser } from '../redux/userSlice';
import { AnimatedPage } from './AnimatedPage';
import { Button } from '../components/UI/Button';
import { auth, storage } from '../firebase';
import { ButtonSkeleton } from '../components/Skeletons/ButtonSkeleton';
import { Or } from '../components/Or';

export const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(({ user }) => user.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { name, email, photo } = user || {};

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);

      dispatch(removeUser());
      navigate('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;

      if (!user) return;

      const isPasswordProvider = user.providerData[0].providerId === 'password';

      if (user.photoURL && isPasswordProvider) {
        const photoId = user.uid;
        const formatPhoto = user.photoURL.includes('jpeg') ? 'jpeg' : 'png';
        const storageRef = ref(storage, `images/${photoId}.${formatPhoto}`);

        await deleteObject(storageRef);
      }

      await deleteUser(user);

      dispatch(removeUser());
      navigate('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage hFull>
      <div className="grid place-items-center h-full py-10">
        {user && (
          <div className="flex flex-col items-center gap-5">
            {photo ? (
              <img
                src={photo}
                alt="user photo"
                className="w-32 square-img rounded-full"
              />
            ) : (
              <CgProfile className="w-32 h-32 text-black" />
            )}

            <div className="text-center">
              <h3 className="page-title">Hello, {name}</h3>
              <p className="text-sm text-light-gray">{email}</p>
            </div>

            <div className="flex flex-col gap-5">
              {isLoading ? (
                <ButtonSkeleton />
              ) : (
                <Button text="Sign Out" onClick={handleSignOut} />
              )}

              <Or />

              {isLoading ? (
                <ButtonSkeleton />
              ) : (
                <Button text="Delete User" onClick={handleDeleteUser} />
              )}
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
