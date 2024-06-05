import { useEffect, useState } from 'react';
import { deleteUser, signOut } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { remove, ref as refDB } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useAppSelector } from '../store/hooks';
import { AnimatedPage } from './AnimatedPage';
import { Button } from '../components/UI/Button';
import { auth, database, storage } from '../firebase';
import { ButtonSkeleton } from '../components/Skeletons/ButtonSkeleton';
import { Or } from '../components/Or';

export const SignOutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(({ user }) => user.currentUser);
  const navigate = useNavigate();

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

      const userId = user.uid;
      const isPasswordProvider = user.providerData[0].providerId === 'password';

      if (user.photoURL && isPasswordProvider) {
        const formatPhoto = user.photoURL.includes('jpeg') ? 'jpeg' : 'png';
        const storageRef = ref(storage, `images/${userId}.${formatPhoto}`);

        await deleteObject(storageRef);
      }

      const userRef = refDB(database, `users/${userId}`);
      await remove(userRef);

      await deleteUser(user);

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
                <Button onClick={handleSignOut}>Sign Out</Button>
              )}

              <Or />

              {isLoading ? (
                <ButtonSkeleton />
              ) : (
                <Button onClick={handleDeleteUser}>Delete User</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
