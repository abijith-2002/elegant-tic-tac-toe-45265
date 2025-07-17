import React from 'react';
import { motion } from 'framer-motion';

const ModeSelector = ({ onSelectMode }) => {
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

  const buttonVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="mode-selector"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="mode-content"
        variants={contentVariants}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Choose Your Game Mode
        </motion.h2>
        <div className="mode-buttons">
          <motion.button
            className="button button-primary"
            onClick={() => onSelectMode('PVP')}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Player vs Player
          </motion.button>
          <motion.button
            className="button button-secondary"
            onClick={() => onSelectMode('AI')}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Player vs AI
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;
