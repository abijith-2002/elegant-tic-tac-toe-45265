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

  const scoreVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const renderScore = (value, player) => {
    const color = player === 'X' ? 'var(--primary-light)' : 
                  player === 'O' ? 'var(--secondary-light)' : 
                  'var(--accent)';
    
    return (
      <motion.div
        key={`${player}-${value}`}
        initial="initial"
        animate="animate"
        variants={scoreVariants}
        style={{
          color: color,
          fontWeight: 'bold',
          fontSize: '1.5rem',
          textShadow: `0 0 10px ${color}40`
        }}
      >
        {value}
      </motion.div>
    );
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
        whileHover={{ 
          x: 10, 
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transition: { duration: 0.2 }
        }}
      >
        <span>Player X</span>
        {renderScore(scores.X, 'X')}
      </motion.div>

      <motion.div 
        className="score-item"
        variants={itemVariants}
        whileHover={{ 
          x: 10, 
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transition: { duration: 0.2 }
        }}
      >
        <span>Player O</span>
        {renderScore(scores.O, 'O')}
      </motion.div>

      <motion.div 
        className="score-item"
        variants={itemVariants}
        whileHover={{ 
          x: 10, 
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transition: { duration: 0.2 }
        }}
      >
        <span>Ties</span>
        {renderScore(scores.ties, 'ties')}
      </motion.div>
    </motion.div>
  );
};

export default Scoreboard;
