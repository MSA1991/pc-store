import { motion as m } from 'framer-motion';
import { IoCheckmarkSharp, IoCallSharp } from 'react-icons/io5';

const services = [
  'Computer setup',
  'Virus removal',
  'Networking',
  'Custom build PC',
  'Hardware upgrade',
  'Many more',
];

export const Advertisement = () => (
  <m.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
    className="section flex flex-col justify-between h-96"
  >
    <div>
      <h3 className="text-lg font-bold mb-1">Have a computer problems?</h3>
      <p className="text-blue text-sm font-bold">We halp to fix all problem!</p>
    </div>

    <ul className="flex flex-col gap-1">
      {services.map((service, i) => (
        <li key={i} className="flex gap-1 items-center">
          <IoCheckmarkSharp className="w-4 h-4 text-blue shrink-0" />
          {service}
        </li>
      ))}
    </ul>

    <p className="flex gap-2 items-center">
      <IoCallSharp className="w-5 h-5 text-light-gray" />

      <a
        href="tel:(505) 503-4455"
        className="text-blue hover-text font-bold text-sm"
      >
        (505) 503-4455
      </a>
    </p>
  </m.div>
);
