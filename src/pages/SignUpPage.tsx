import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

import { AnimatedPage } from './AnimatedPage';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { PhotoUploader } from '../components/UI/PhotoUploader';
import { ButtonSkeleton } from '../components/Skeletons/ButtonSkeleton';
import { Or } from '../components/Or';
import { LogInWithSocialMedia } from '../components/LogInWithSocialMedia';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { auth, storage } from '../firebase';
import { SignUpForm } from '../types/Forms';

const MAX_PHOTO_SIZE_KB = 300;

export const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    defaultValues: {
      userPhoto: null,
      userName: '',
      userEmail: '',
      userPassword: '',
      confirmedPassword: '',
    },
  });

  const handleSignUp = handleSubmit(async (data) => {
    const { userPhoto, userName, userEmail, userPassword } = data;

    try {
      setIsLoading(true);

      const credential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const user = credential.user;
      const userId = user.uid;
      let photoURL = null;

      if (userPhoto) {
        const formatPhoto = userPhoto.type.split('/').at(-1);
        const storageRef = ref(storage, `images/${userId}.${formatPhoto}`);

        await uploadBytes(storageRef, userPhoto);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, { displayName: userName, photoURL });

      dispatch(
        setUser({
          name: userName,
          email: userEmail,
          photo: photoURL,
          id: userId,
        })
      );

      navigate('/home');
    } catch (error) {
      toast('Error while creating account');
      reset();
    } finally {
      setIsLoading(false);
    }
  });

  const changeUserPhoto = async (file: File) => {
    setValue('userPhoto', file);
    await trigger('userPhoto');
  };

  return (
    <AnimatedPage hFull>
      <div className="grid place-items-center h-full py-10">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-[280px] flex flex-col gap-5 items-center py-10"
        >
          <div className="relative">
            <Controller
              control={control}
              name="userPhoto"
              rules={{
                validate: {
                  format: (file) =>
                    !file ||
                    ['image/jpeg', 'image/png'].includes(file.type) ||
                    'The photo must have a JPEG or PNG extension',
                  size: (file) =>
                    !file ||
                    file.size < MAX_PHOTO_SIZE_KB * 1024 ||
                    `Max photo size ${MAX_PHOTO_SIZE_KB}kB`,
                },
              }}
              render={() => <PhotoUploader onChange={changeUserPhoto} />}
            />

            {errors.userPhoto && (
              <p className="absolute w-max -bottom-4 left-1/2 -translate-x-1/2 text-xs text-center text-cayn">{`${errors.userPhoto.message}`}</p>
            )}
          </div>
          <div className="w-full relative">
            <Controller
              control={control}
              name="userName"
              rules={{
                required: 'Enter your name',
                minLength: {
                  value: 3,
                  message: 'Name to be at least 3 characters long',
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  value={value}
                  setValue={onChange}
                  type="text"
                  placeholder="Username"
                  onBlur={onBlur}
                />
              )}
            />

            {errors.userName && (
              <p className="absolute -bottom-4 left-0 text-xs text-cayn">{`${errors.userName.message}`}</p>
            )}
          </div>
          <div className="w-full relative">
            <Controller
              control={control}
              name="userEmail"
              rules={{
                required: 'Enter your email',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Enter a valid email',
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  value={value}
                  setValue={onChange}
                  type="email"
                  placeholder="Email"
                  onBlur={onBlur}
                />
              )}
            />

            {errors.userEmail && (
              <p className="absolute -bottom-4 left-0 text-xs text-cayn">{`${errors.userEmail.message}`}</p>
            )}
          </div>
          <div className="w-full relative">
            <Controller
              control={control}
              name="userPassword"
              rules={{
                required: 'Enter your password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  value={value}
                  setValue={onChange}
                  type="password"
                  placeholder="Password"
                  onBlur={onBlur}
                />
              )}
            />

            {errors.userPassword && (
              <p className="absolute -bottom-4 left-0 text-xs text-cayn">{`${errors.userPassword.message}`}</p>
            )}
          </div>
          <div className="w-full relative">
            <Controller
              control={control}
              name="confirmedPassword"
              rules={{
                required: 'Enter your password again',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: (value) =>
                  value === getValues('userPassword') ||
                  'Passwords do not match',
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  value={value}
                  setValue={onChange}
                  type="password"
                  placeholder="Confirm password"
                  onBlur={onBlur}
                />
              )}
            />

            {errors.confirmedPassword && (
              <p className="absolute -bottom-4 left-0 text-xs text-cayn">{`${errors.confirmedPassword.message}`}</p>
            )}
          </div>
          {isLoading ? (
            <ButtonSkeleton wFull />
          ) : (
            <Button type="submit" wFull>
              Sign Up
            </Button>
          )}
          <Or />

          <LogInWithSocialMedia />

          <div className="text-light-gray">
            Already have an account?{' '}
            <Link to="/login" className="text-blue hover-text">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
};
