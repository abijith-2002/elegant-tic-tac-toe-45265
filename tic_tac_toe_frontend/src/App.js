import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import ModeSelector from './components/ModeSelector';
import { calculateWinner, calculateBestMove } from './utils/ai';
import clickSound from './assets/sounds/click.mp3';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [playClick] = useSound(clickSound, { volume: 0.5 });

  const winner = calculateWinner(squares);
  const gameOver = winner || squares.every(square => square !== null);

  useEffect(() => {
    if (gameMode === 'AI' && !xIsNext && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = calculateBestMove(squares);
        handleClick(aiMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, gameMode, gameOver]);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      setScores(prev => ({
        ...prev,
        [winner.winner]: prev[winner.winner] + 1
      }));
      const timer = setTimeout(() => setShowConfetti(false), 4500);
      return () => clearTimeout(timer);
    } else if (gameOver) {
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }
  }, [winner, gameOver]);

  const handleClick = (i) => {
    if (squares[i] || gameOver || (gameMode === 'AI' && !xIsNext)) return;

    playClick();
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner.winner}`;
    } else if (squares.every(square => square)) {
      return "Game Draw!";
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  if (!gameMode) {
    return <ModeSelector onSelectMode={handleModeSelect} />;
  }

  return (
    <div className="App">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          initialVelocityY={20}
          colors={['var(--primary)', 'var(--secondary)', 'var(--accent)', '#ffffff']}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <motion.h1
        className="welcome-heading"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.8
        }}
      >
        Welcome to Tic Tac Toe
      </motion.h1>
      <motion.div
        className="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={getStatus()}
      >
        {getStatus()}
      </motion.div>
      <div className="game-container">
        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={winner?.line}
        />
        <div className="controls">
          <Scoreboard scores={scores} />
          <motion.button
            className="button button-primary"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset Game
          </motion.button>
          <motion.button
            className="button button-secondary"
            onClick={() => setGameMode(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Change Mode
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default App;
