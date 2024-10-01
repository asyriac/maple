import React, { useEffect, useRef, useState } from 'react'
import { polygonDistance } from '../helper';
import UserFeedback from './UserFeedback';
const countryData = require("../data/country_data.json").features 


const Input = ({guesses, setGuesses, correctAnswer}) => {

  const [error, setError] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");  
  const [win, setWin] = useState("")

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
    const guessCountry = findCountry(sanitizedGuess, countryData);
    setCurrentGuess("");
    if (!guessCountry) {
        setError("Country not found");
        ref.current?.select();
        return;
    }
    if (guessCountry && correctAnswer) {
        guessCountry["proximity"] = polygonDistance(
          guessCountry,
          correctAnswer
        );
        const answerName = correctAnswer.properties.NAME;
        if (guessCountry.properties.NAME === answerName) {
            setWin(true);
        }
    }
    setGuesses([...guesses, guessCountry]);
    setError("");

  }

  return (
   <>
    <form onSubmit={addGuess} className='form'>
        <input className='input' type="text" ref={ref} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)}/>
        <button className='button'>Submit</button>
    </form>
    <UserFeedback win={win}/>
   </>
  )
}

export default Input