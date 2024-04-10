import { motion as m } from 'framer-motion';
import { IoIosCheckmark } from 'react-icons/io';

const services = [
  'Computer setup',
  'Virus removal',
  'Networking',
  'Custom build PC',
  'Hardware upgrade',
  'Hard disk recovery',
  'Many more',
];

export const Advertisement = () => (
  <m.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
    className="section flex flex-col gap-5"
  >
    <div>
      <h3 className="text-lg font-bold mb-1 uppercase">
        Have a computer problems?
      </h3>
      <p className="text-blue text-sm font-bold">We halp to fix all problem!</p>
    </div>

    <ul className="flex flex-col gap-1">
      {services.map((service, i) => (
        <li key={i} className="flex items-center">
          <IoIosCheckmark className="w-6 h-6 text-blue shrink-0" />
          {service}
        </li>
      ))}
    </ul>

    <p className="font-bold text-sm">
      Call now{' '}
      <a href="tel:0123456789" className="text-blue hover-text">
        0123456789
      </a>
    </p>
  </m.div>
);
