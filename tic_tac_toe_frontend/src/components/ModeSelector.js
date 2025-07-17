import React from 'react';
import { motion } from 'framer-motion';

const ModeSelector = ({ onSelectMode }) => {
  return (
    <motion.div
      className="mode-selector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mode-content"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <h2>Select Game Mode</h2>
        <div className="mode-buttons">
          <motion.button
            className="button button-primary"
            onClick={() => onSelectMode('PVP')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Player vs Player
          </motion.button>
          <motion.button
            className="button button-secondary"
            onClick={() => onSelectMode('AI')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Player vs AI
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModeSelector;
