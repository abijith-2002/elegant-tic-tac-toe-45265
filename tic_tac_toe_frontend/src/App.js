import React, { useState, useEffect } from 'react';
import WelcomeModal from './components/WelcomeModal';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import Lottie from 'lottie-react';
import victoryAnimation from './assets/animations/victory.json';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import ModeSelector from './components/ModeSelector';
import { calculateWinner, calculateBestMove } from './utils/ai';
import clickSound from './assets/sounds/click.mp3';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [winAnimation, setWinAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [playClick] = useSound(clickSound, { volume: 0.5 });

  const winner = calculateWinner(squares);
  const gameOver = winner || squares.every(square => square !== null);

  useEffect(() => {
    // Simulated loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (gameMode === 'AI' && !xIsNext && !gameOver) {
      // Add slight randomization to AI "thinking" time for more natural feel
      const minDelay = 600;
      const maxDelay = 1200;
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
      
      // Show thinking cursor during AI turn
      document.body.style.cursor = 'wait';
      
      const timer = setTimeout(() => {
        const aiMove = calculateBestMove(squares);
        handleClick(aiMove);
        document.body.style.cursor = 'default';
      }, randomDelay);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, gameMode, gameOver]);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      setWinAnimation(true);
      setScores(prev => ({
        ...prev,
        [winner.winner]: prev[winner.winner] + 1
      }));
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setWinAnimation(false);
      }, 4500);
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
    setWinAnimation(false);
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    resetGame();
    setScores({ X: 0, O: 0, ties: 0 });
  };

  const getStatus = () => {
    if (winner) {
      return `${winner.winner} Wins!`;
    } else if (squares.every(square => square)) {
      return "It's a Draw!";
    } else {
      return `${xIsNext ? 'X' : 'O'}'s Turn`;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (showWelcome) {
    return <WelcomeModal onContinue={() => setShowWelcome(false)} />;
  }

  if (!gameMode) {
    return <ModeSelector onSelectMode={handleModeSelect} />;
  }

  return (
    <div className="App">
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            initialVelocityY={20}
            colors={['#6366f1', '#ec4899', '#fbbf24', '#ffffff']}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="welcome-section"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.8
        }}
      >
        <h1 className="welcome-heading">Tic Tac Toe</h1>
      </motion.div>

      <motion.div
        className="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={getStatus()}
        transition={{ duration: 0.3 }}
      >
        {getStatus()}
      </motion.div>

      <motion.div
        className="game-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
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
      </motion.div>

      <AnimatePresence>
        {winAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem'
              }}
            >
              <Lottie
                animationData={victoryAnimation}
                autoplay
                loop={false}
                style={{ width: '300px', height: '300px' }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  color: winner.winner === 'X' ? 'var(--primary-light)' : 'var(--secondary-light)',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  background: `linear-gradient(135deg, 
                    ${winner.winner === 'X' ? 'var(--primary-light)' : 'var(--secondary-light)'} 0%,
                    ${winner.winner === 'X' ? 'var(--primary)' : 'var(--secondary)'} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  padding: '1rem'
                }}
              >
                {winner.winner} Wins!
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
