import React, { useRef, useEffect, useState } from 'react';
import UserFeedback from './UserFeedback';

function Input({ addGuess, win, error, guesses, setError }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addGuess(currentGuess);
    setCurrentGuess("");
  };

  const handleChange = (e) => {
    setCurrentGuess(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <input
          className='input'
          type="text"
          ref={inputRef}
          value={currentGuess}
          onChange={handleChange}
          disabled={win}
        />
        <button className='button' disabled={win}>Submit</button>
      </form>
      <UserFeedback win={win} error={error} guesses={guesses} />
    </>
  );
}

export default React.memo(Input);