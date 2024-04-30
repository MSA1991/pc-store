import { MdEmail } from 'react-icons/md';
import { FaLock, FaSearch, FaUser } from 'react-icons/fa';

type Props = {
  type: 'text' | 'search' | 'email' | 'password';
};

const icons = {
  text: FaUser,
  search: FaSearch,
  email: MdEmail,
  password: FaLock,
};

export const InputIcon = ({ type }: Props) => {
  const Icon = icons[type];

  return (
    <Icon className="w-4 h-4 text-light-gray shrink-0 transition-colors" />
  );
};
