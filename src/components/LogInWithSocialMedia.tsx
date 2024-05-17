import { useNavigate } from 'react-router-dom';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { auth } from '../firebase';
import { Button } from './UI/Button';
import { useAppDispatch } from '../redux/hooks';
import { setUserPhoto } from '../redux/userSlice';

export const LogInWithSocialMedia = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      const credential = FacebookAuthProvider.credentialFromResult(response);

      const accessToken = credential?.accessToken;
      const userPhoto = user.photoURL;
      const newUserPhoto = `${userPhoto}?height=500&access_token=${accessToken}`;

      await updateProfile(user, { photoURL: newUserPhoto });

      dispatch(setUserPhoto(newUserPhoto));
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex gap-5">
      <Button icon={FaGoogle} wFull onClick={handleLogInWithGoogle} />
      <Button icon={FaFacebookF} wFull onClick={handleLogInWithFacebook} />
    </div>
  );
};
