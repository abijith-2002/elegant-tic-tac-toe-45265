import React from 'react';
import { motion } from 'framer-motion';

const Board = ({ squares, onClick, winningLine }) => {
  const cellVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 }
  };

  const symbolVariants = {
    x: {
      initial: { pathLength: 0, stroke: 'var(--primary)' },
      animate: { pathLength: 1, transition: { duration: 0.5 } }
    },
    o: {
      initial: { pathLength: 0, stroke: 'var(--secondary)' },
      animate: { pathLength: 1, transition: { duration: 0.5 } }
    }
  };

  const renderSymbol = (value) => {
    if (!value) return null;

    if (value === 'X') {
      return (
        <svg width="60" height="60" viewBox="0 0 60 60">
          <motion.line
            x1="15" y1="15" x2="45" y2="45"
            strokeWidth="4"
            stroke="var(--primary)"
            variants={symbolVariants.x}
            initial="initial"
            animate="animate"
            strokeLinecap="round"
          />
          <motion.line
            x1="45" y1="15" x2="15" y2="45"
            strokeWidth="4"
            stroke="var(--primary)"
            variants={symbolVariants.x}
            initial="initial"
            animate="animate"
            strokeLinecap="round"
          />
        </svg>
      );
    } else {
      return (
        <svg width="60" height="60" viewBox="0 0 60 60">
          <motion.circle
            cx="30" cy="30" r="15"
            strokeWidth="4"
            stroke="var(--secondary)"
            fill="none"
            variants={symbolVariants.o}
            initial="initial"
            animate="animate"
            strokeLinecap="round"
          />
        </svg>
      );
    }
  };

  return (
    <div className="board">
      {squares.map((square, i) => (
        <motion.button
          key={i}
          className={`cell ${square?.toLowerCase() || ''} ${
            winningLine?.includes(i) ? 'winning' : ''
          }`}
          onClick={() => onClick(i)}
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: i * 0.05
          }}
        >
          {renderSymbol(square)}
        </motion.button>
      ))}
    </div>
  );
};

export default Board;
