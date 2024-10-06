import React, { useEffect, useRef, useState } from 'react'
import { polygonDistance } from '../helper';
import UserFeedback from './UserFeedback';
import * as turf from "@turf/turf";
const countryData = require("../data/country_data.json").features 


const Input = ({guesses, setGuesses, correctAnswer, onWin, error, setError, currentGuess, setCurrentGuess, win, setWin}) => {

  const ref = useRef(null);
  
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  function findCountry(countryName, list) {
    return list.find((country) => {
      const { NAME, NAME_LONG, ABBREV, ADMIN, BRK_NAME, NAME_SORT } =
        country.properties;

      return (
        NAME.toLowerCase() === countryName ||
        NAME_LONG.toLowerCase() === countryName ||
        ADMIN.toLowerCase() === countryName ||
        ABBREV.toLowerCase() === countryName ||
        ABBREV.replace(/\./g, "").toLowerCase() === countryName ||
        NAME.replace(/-/g, " ").toLowerCase() === countryName ||
        BRK_NAME.toLowerCase() === countryName ||
        NAME_SORT.toLowerCase() === countryName
      );
    });
  }

  const addGuess = (e) => {
    e.preventDefault();
    const sanitizedGuess = currentGuess.trim().toLowerCase()
    const alreadyGuessed = findCountry(sanitizedGuess, guesses);
    setCurrentGuess("");
    if(alreadyGuessed){
      setError("You've already guessed that country!")
      ref.current?.select();
      return;
    }
    const guessCountry = findCountry(sanitizedGuess, countryData);
    if (!guessCountry) {
        setError("You've enterted an invalid country. Please try again!");
        ref.current?.select();
        return;
    }
    if (guessCountry && correctAnswer) {
        guessCountry["proximity"] = polygonDistance(
          guessCountry,
          correctAnswer
        );
        const answerName = correctAnswer.properties.NAME;

        const isAdjacent = turf.booleanTouches(correctAnswer.geometry, guessCountry.geometry);

        if (guessCountry.properties.NAME === answerName) {
            setWin(true);
            setTimeout(onWin, 1500);
        }else if (isAdjacent) {
          // Set adjacent flag if the guess is adjacent to the correct answer
          guessCountry["adjacent"] = true;
        }
        else if (guesses.length > 0) {
          // Compare the proximity with the previous guess
          const lastGuess = guesses[guesses.length - 1];
          const warmer = guessCountry.proximity < lastGuess.proximity;
          guessCountry["warmer"] = warmer;
        }
    }
    setGuesses([...guesses, guessCountry]);
    setError("");

  }

  return (
   <>
    <form onSubmit={addGuess} className='form'>
        <input className='input' type="text" ref={ref} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)} disabled={win}/>
        <button className='button' disabled={win}>Submit</button>
    </form>
    <UserFeedback win={win} error={error} guesses={guesses}/>
   </>
  )
}

export default Input