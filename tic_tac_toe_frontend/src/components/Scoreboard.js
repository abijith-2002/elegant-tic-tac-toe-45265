import React from 'react';
import { motion } from 'framer-motion';

const Scoreboard = ({ scores }) => {
  return (
    <motion.div
      className="scoreboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="score-title">Scoreboard</h3>
      <div className="score-item">
        <span>Player X</span>
        <span>{scores.X}</span>
      </div>
      <div className="score-item">
        <span>Player O</span>
        <span>{scores.O}</span>
      </div>
      <div className="score-item">
        <span>Ties</span>
        <span>{scores.ties}</span>
      </div>
    </motion.div>
  );
};

export default Scoreboard;
