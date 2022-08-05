import { motion } from 'framer-motion';

import { FaRegBell } from 'react-icons/fa';

const variants = {
  hidden: {
    translateX: 400,
  },
  visible: {
    translateX: 0,
    transition: {
      duration: 1,
    },
  },
};

const Alert = ({ alert }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      className={`${
        alert.error ? 'bg-red-500' : 'bg-green-500'
      } font-bold text-white uppercase p-2 rounded text-center m-2 absolute top-0 right-0 flex items-center gap-2`}
    >
      <FaRegBell />
      {alert.message}
    </motion.div>
  );
};

export default Alert;
