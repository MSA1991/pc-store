import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { Logo } from './Logo';

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

      <ul className="flex space-x-5">
        <li>
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook className="icon" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank">
            <FaInstagram className="icon" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank">
            <FaTwitter className="icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
