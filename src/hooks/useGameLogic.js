import { useState, useCallback } from 'react';
import { findCountry } from '../utils/countryUtils';
import { getRandomPlayableCountry } from '../utils/gameUtils';
import { polygonDistance } from '../utils/geometryUtils';

export function useGameLogic() {
  const [gameState, setGameState] = useState(() => ({
    correctAnswer: getRandomPlayableCountry(),
    guesses: [],
    error: "",
    win: false,
    autoRotate: true
  }));

  const addGuess = useCallback((guessName) => {
    setGameState(prevState => {
      const { correctAnswer, guesses } = prevState;
      const sanitizedGuess = guessName.trim().toLowerCase();
      const alreadyGuessed = findCountry(sanitizedGuess, guesses);
      
      if (alreadyGuessed) {
        return { ...prevState, error: "You've already guessed that country!" };
      }

      const guessCountry = findCountry(sanitizedGuess);
      
      if (!guessCountry) {
        return { ...prevState, error: "You've entered an invalid country. Please try again!" };
      }

      const proximity = polygonDistance(guessCountry, correctAnswer);
      const newGuess = {
        ...guessCountry,
        proximity
      };

      if (guessCountry.properties.NAME === correctAnswer.properties.NAME) {
        return {
          ...prevState,
          guesses: [...guesses, newGuess],
          win: true,
          error: "",
          autoRotate: false
        };
      } else {
        if (guesses.length > 0) {
          newGuess.warmer = proximity < guesses[guesses.length - 1].proximity;
        }
        return {
          ...prevState,
          guesses: [...guesses, newGuess],
          error: "",
          autoRotate: false
        };
      }
    });
  }, []);

  const startNewGame = useCallback(() => {
    setGameState({
      correctAnswer: getRandomPlayableCountry(),
      guesses: [],
      error: "",
      win: false,
      autoRotate: true
    });
  }, []);

  const setError = useCallback((error) => {
    setGameState(prevState => ({ ...prevState, error }));
  }, []);

  return {
    ...gameState,
    addGuess,
    startNewGame,
    setError
  };
}