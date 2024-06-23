import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { CgProfile } from 'react-icons/cg';
import { toast } from 'react-toastify';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebase';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Checkbox } from '../components/UI/Checkbox';
import { LogInWithSocialMedia } from '../components/LogInWithSocialMedia';
import { ButtonSkeleton } from '../components/Skeletons/ButtonSkeleton';
import { AnimatedPage } from './AnimatedPage';
import { Or } from '../components/Or';
import { LogInForm } from '../types/Forms';

export const LogInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInForm>({
    mode: 'onBlur',
    defaultValues: {
      userEmail: '',
      userPassword: '',
      rememberUser: false,
    },
  });

  const handleLogIn = handleSubmit(async (data) => {
    const { userEmail, userPassword, rememberUser } = data;

    try {
      setIsLoading(true);

      const persistence = rememberUser
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);

      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate('/home');
    } catch (error) {
      toast('Error logging into the account');
      reset();
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <AnimatedPage hFull>
      <div className="grid place-items-center h-full py-10">
        <form
          onSubmit={handleLogIn}
          className="w-full max-w-[280px] flex flex-col gap-5 items-center py-10"
        >
          <CgProfile className="w-32 h-32 text-black" />

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

          <div className="self-start">
            <Controller
              control={control}
              name="rememberUser"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  onToggleChecked={() => onChange(!value)}
                  label="Remember Me"
                />
              )}
            />
          </div>

          {isLoading ? (
            <ButtonSkeleton wFull />
          ) : (
            <Button wFull type="submit">
              Log In
            </Button>
          )}

          <Or />

          <LogInWithSocialMedia />

          <div className="text-light-gray">
            Don't have an account{' '}
            <Link to="/signup" className="text-blue hover-text">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
};
