import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { AnimatedPage } from './AnimatedPage';
import { CgProfile } from 'react-icons/cg';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Checkbox } from '../components/UI/Checkbox';

export const LogIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <AnimatedPage hFull>
      <div className="grid place-items-center h-full">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-[300px] flex flex-col gap-5 items-center py-10"
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

          <Button text="Log In" type="submit" wFull />

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
