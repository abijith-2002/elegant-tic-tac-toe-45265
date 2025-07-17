import React from 'react';
import { motion } from 'framer-motion';

const Scoreboard = ({ scores }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="scoreboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="score-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Scoreboard
      </motion.h3>
      <motion.div 
        className="score-item"
        variants={itemVariants}
        whileHover={{ x: 10, transition: { duration: 0.2 } }}
      >
        <span>Player X</span>
        <motion.span
          key={scores.X}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {scores.X}
        </motion.span>
      </motion.div>
      <motion.div 
        className="score-item"
        variants={itemVariants}
        whileHover={{ x: 10, transition: { duration: 0.2 } }}
      >
        <span>Player O</span>
        <motion.span
          key={scores.O}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {scores.O}
        </motion.span>
      </motion.div>
      <motion.div 
        className="score-item"
        variants={itemVariants}
        whileHover={{ x: 10, transition: { duration: 0.2 } }}
      >
        <span>Ties</span>
        <motion.span
          key={scores.ties}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {scores.ties}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Scoreboard;
