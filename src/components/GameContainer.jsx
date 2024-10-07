import React, { useState, useCallback, useEffect } from 'react';
import Globe from './Globe';
import Input from './Input';
import Modal from './Modal';
import { useGameLogic } from '../hooks/useGameLogic';

function GameContainer() {
  const {
    correctAnswer,
    guesses,
    error,
    win,
    autoRotate,
    addGuess,
    startNewGame,
    setError
  } = useGameLogic();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => setIsModalOpen(prev => !prev), []);

  useEffect(() => {
    if (win) {
        setTimeout(()=>{
            setIsModalOpen(true);
         }, 1500)
    }
  }, [win]);

  const handleStartNewGame = useCallback(() => {
    startNewGame();
    setIsModalOpen(false);
  }, [startNewGame]);

  console.log(correctAnswer.properties.ADMIN)

  return (
    <>
      <Input
        addGuess={addGuess}
        win={win}
        error={error}
        guesses={guesses}
        setError={setError}
      />
      <Globe
        guesses={guesses}
        correctAnswer={correctAnswer}
        autoRotate={autoRotate}
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={toggleModal}
        onStartNewGame={handleStartNewGame}
      />
    </>
  );
}

export default React.memo(GameContainer);