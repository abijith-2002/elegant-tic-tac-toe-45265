import React from 'react';
import { motion } from 'framer-motion';

const Board = ({ squares, onClick, winningLine }) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <motion.button
          key={i}
          className={`cell ${square?.toLowerCase() || ''} ${
            winningLine?.includes(i) ? 'winning' : ''
          }`}
          onClick={() => onClick(i)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {square}
        </motion.button>
      ))}
    </div>
  );
};

export default Board;
