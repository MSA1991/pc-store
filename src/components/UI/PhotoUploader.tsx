import { ChangeEvent, useState } from 'react';
import { FaCamera } from 'react-icons/fa6';

type Props = {
  onChange: (file: File) => void;
};

export const PhotoUploader = ({ onChange }: Props) => {
  const [urlPhoto, setUrlPhoto] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    onChange(file);

    if (['image/jpeg', 'image/png'].includes(file.type)) {
      const urlPhoto = URL.createObjectURL(file);
      setUrlPhoto(urlPhoto);
    } else {
      setUrlPhoto(null);
    }
  };

  return (
    <label className="grid place-items-center w-32 h-32 rounded-full bg-black relative cursor-pointer group overflow-hidden">
      {urlPhoto ? (
        <img src={urlPhoto} alt="photo" className="square-img" />
      ) : (
        <FaCamera className="w-10 h-10 text-light-gray transition-colors group-hover:text-blue" />
      )}

      <input
        className="absolute w-0 h-0"
        onChange={handleChange}
        type="file"
        accept="image/png, image/jpeg"
      />
    </label>
  );
};
