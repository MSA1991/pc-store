import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { Logo } from './Logo';

const socialMediaLinks = [
  {
    url: 'https://www.facebook.com/',
    icon: <FaFacebook className="icon" />,
  },
  {
    url: 'https://www.instagram.com',
    icon: <FaInstagram className="icon" />,
  },
  {
    url: 'https://twitter.com/',
    icon: <FaTwitter className="icon" />,
  },
];

export const Footer = () => {
  return (
    <footer className="section grid grid-cols-2 sm:grid-cols-[1fr_max-content_1fr] items-center gap-y-2">
      <Logo />

      <div className="text-light-gray text-sm sm:text-base justify-self-center order-1 sm:order-none col-span-2 sm:col-auto">
        Developed by{' '}
        <a
          href="https://github.com/MSA1991"
          target="_blank"
          className="text-blue hover-text"
        >
          S. Mykhalskyi
        </a>
      </div>

      <ul className="flex gap-2 sm:gap-5 justify-self-end">
        {socialMediaLinks.map(({ url, icon }) => (
          <li key={url}>
            <a href={url} target="_blank">
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
