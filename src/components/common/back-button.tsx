import { FaArrowLeft } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="flex items-center">
      <motion.div
        animate={{
          x: [-5, 5, -5], // Moves the icon left and right
        }}
        transition={{
          duration: 1.5, // Duration for one complete cycle
          repeat: Infinity, // Infinite animation
          ease: 'easeInOut', // Smooth easing
        }}
      >
        <FaArrowLeft className="text-base" />
      </motion.div>
    </button>
  );
};

export default BackButton;
