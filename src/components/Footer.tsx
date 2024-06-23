import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

import { Logo } from './Logo';

const socialMediaLinks = [
  {
    url: 'https://www.facebook.com/',
    icon: FaFacebook,
  },
  {
    url: 'https://www.instagram.com',
    icon: FaInstagram,
  },
  {
    url: 'https://twitter.com/',
    icon: FaTwitter,
  },
];

export const Footer = () => (
  <footer className="section grid grid-cols-2 sm:grid-cols-[1fr_max-content_1fr] items-center gap-y-5">
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

    <ul className="flex gap-2 justify-self-end">
      {socialMediaLinks.map(({ url, icon: Icon }) => (
        <li key={url} className="p-1">
          <a href={url} target="_blank">
            <Icon className="icon" />
          </a>
        </li>
      ))}
    </ul>
  </footer>
);
