import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const WelcomeModal = ({ onContinue }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { when: "afterChildren" }
    }
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      y: -50,
      opacity: 0
    }
  };

  return (
    <motion.div
      className="welcome-modal"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="welcome-modal-content"
        variants={contentVariants}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="welcome-modal-title"
        >
          Welcome to Tic Tac Toe!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="welcome-modal-description"
        >
          Experience the classic game with a modern twist. 
          Challenge a friend or test your skills against the AI.
        </motion.p>

        <motion.button
          className="button button-primary welcome-modal-button"
          onClick={onContinue}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Let's Play!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;
