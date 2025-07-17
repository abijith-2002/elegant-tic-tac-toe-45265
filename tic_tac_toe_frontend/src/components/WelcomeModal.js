import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import welcomeAnimation from '../assets/animations/welcome.json';

const WelcomeModal = ({ onContinue }) => {
  const [showContent, setShowContent] = useState(false);
  const [playLottie, setPlayLottie] = useState(false);

  useEffect(() => {
    // Sequence the animations
    const timer = setTimeout(() => {
      setShowContent(true);
      setPlayLottie(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      y: -50,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        delay: 1
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="welcome-modal"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="welcome-modal-content"
        variants={contentVariants}
      >
        <AnimatePresence>
          {showContent && (
            <>
              <motion.div
                className="welcome-animation-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Lottie
                  animationData={welcomeAnimation}
                  autoplay={playLottie}
                  loop={false}
                  style={{ width: '200px', height: '200px', margin: '0 auto' }}
                />
              </motion.div>

              <motion.h1
                className="welcome-modal-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Welcome to Tic Tac Toe!
              </motion.h1>
              
              <motion.p
                className="welcome-modal-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Experience the classic game with a modern twist. 
                Challenge a friend or test your skills against our AI in this 
                beautifully designed version of Tic Tac Toe.
              </motion.p>

              <motion.div
                style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '30px'
                }}
              >
                <motion.button
                  className="button button-primary welcome-modal-button"
                  onClick={onContinue}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Let's Play!
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;
