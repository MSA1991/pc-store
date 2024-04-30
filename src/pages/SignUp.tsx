import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { AnimatedPage } from './AnimatedPage';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { PhotoUploader } from '../components/UI/PhotoUploader';

const MAX_PHOTO_SIZE_KB = 300;

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const changeUserPhoto = async (file: File) => {
    setValue('userPhoto', file);
    await trigger('userPhoto');
  };

  return (
    <AnimatedPage hFull>
      <div className="grid place-items-center h-full py-10">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-[300px] flex flex-col gap-5 items-center py-10"
        >
          <div className="relative">
            <Controller
              control={control}
              name="userPhoto"
              rules={{
                validate: {
                  format: (file) =>
                    ['image/jpeg', 'image/png'].includes(file.type) ||
                    'The photo must have a JPEG or PNG extension',
                  size: (file) =>
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
              name="confirmPassword"
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

            {errors.confirmPassword && (
              <p className="absolute -bottom-4 left-0 text-xs text-cayn">{`${errors.confirmPassword.message}`}</p>
            )}
          </div>

          <Button text="Sign Up" type="submit" wFull />

          <div className="w-full flex gap-2 items-center">
            <div className="h-1 bg-black rounded-full grow"></div>
            <div className="text-sm uppercase font-thin">Or</div>
            <div className="h-1 bg-black rounded-full grow"></div>
          </div>

          <div className="w-full flex gap-5">
            <Button icon={FaGoogle} wFull />
            <Button icon={FaFacebookF} wFull />
          </div>

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
