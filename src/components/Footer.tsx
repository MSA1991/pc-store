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
    <footer className="section flex justify-between items-center flex-wrap">
      <Logo />

      <div className="w-full text-center text-sm order-1 mt-5 sm:order-none sm:mt-0 sm:w-auto md:text-base">
        Developed by{' '}
        <a
          href="https://github.com/MSA1991"
          target="_blank"
          className="text-blue hover:text-cayn transition-colors"
        >
          S. Mykhalskyi
        </a>
      </div>

      <ul className="flex gap-2 sm:gap-5">
        {socialMediaLinks.map(({ url, icon }, i) => (
          <li key={i}>
            <a href={url} target="_blank">
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
