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
import { useAppDispatch } from '../store/hooks';
import { setUserPhoto } from '../store/userSlice';

export const LogInWithSocialMedia = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);

      const user = userCredential.user;
      const userPhoto = user.photoURL;

      if (userPhoto) {
        const newUserPhoto = userPhoto.replace(/=[^=]*$/, '=s500-c');

        await updateProfile(user, { photoURL: newUserPhoto });

        dispatch(setUserPhoto(newUserPhoto));
      }

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);

      const user = userCredential.user;

      const credential =
        FacebookAuthProvider.credentialFromResult(userCredential);

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
      <Button wFull onClick={handleLogInWithGoogle}>
        <FaGoogle />
      </Button>
      <Button wFull onClick={handleLogInWithFacebook}>
        <FaFacebookF />
      </Button>
    </div>
  );
};