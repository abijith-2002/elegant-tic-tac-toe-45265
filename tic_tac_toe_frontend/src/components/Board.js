import React from 'react';
import { motion } from 'framer-motion';

const Board = ({ squares, onClick, winningLine }) => {
  const cellVariants = {
    initial: { 
      scale: 0.8,
      rotateX: -30,
      rotateY: 45,
      opacity: 0
    },
    animate: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      scale: 0.8,
      rotateX: 30,
      rotateY: -45,
      opacity: 0
    }
  };

  const symbolVariants = {
    x: {
      initial: { 
        pathLength: 0,
        opacity: 0,
        scale: 0.8,
        rotate: -45
      },
      animate: { 
        pathLength: 1, 
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { 
          duration: 0.6,
          ease: [0.6, 0.01, -0.05, 0.95],
          opacity: { duration: 0.3 }
        }
      }
    },
    o: {
      initial: { 
        pathLength: 0,
        opacity: 0,
        scale: 0.8
      },
      animate: { 
        pathLength: 1, 
        opacity: 1,
        scale: 1,
        transition: { 
          duration: 0.6,
          ease: [0.6, 0.01, -0.05, 0.95],
          opacity: { duration: 0.3 }
        }
      }
    }
  };

  const renderSymbol = (value) => {
    if (!value) return null;

    if (value === 'X') {
      return (
        <svg width="80" height="80" viewBox="0 0 80 80">
          <motion.path
            d="M20 20L60 60M60 20L20 60"
            stroke="var(--primary-light)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            variants={symbolVariants.x}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M20 20L60 60"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            variants={symbolVariants.x}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M60 20L20 60"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            variants={symbolVariants.x}
            initial="initial"
            animate="animate"
          />
        </svg>
      );
    } else {
      return (
        <svg width="80" height="80" viewBox="0 0 80 80">
          <motion.circle
            cx="40"
            cy="40"
            r="25"
            stroke="var(--secondary-light)"
            strokeWidth="8"
            fill="none"
            variants={symbolVariants.o}
            initial="initial"
            animate="animate"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="25"
            stroke="var(--secondary)"
            strokeWidth="4"
            fill="none"
            variants={symbolVariants.o}
            initial="initial"
            animate="animate"
          />
        </svg>
      );
    }
  };

  return (
    <div 
      className="board"
      role="grid"
      aria-label="Tic Tac Toe Board"
      aria-live="polite"
      aria-atomic="true"
    >
      {squares.map((square, i) => (
        <motion.button
          key={i}
          className={`cell ${square?.toLowerCase() || ''} ${
            winningLine?.includes(i) ? 'winning' : ''
          }`}
          onClick={() => onClick(i)}
          disabled={square !== null} // Prevent double-clicks
          aria-label={`Cell ${i + 1}, ${square || 'empty'}`}
          role="gridcell"
          tabIndex={0}
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
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
