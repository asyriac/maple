import React from 'react'

const UserFeedback = ({ win, error, guesses, onNewGame }) => {
  let message;
  let className;

  if (win) {
    message = "Woohoo! You've found the mystery country.";
    className = "success";
  } else if (error) {
    message = error;
    className = "error-text";
  } else if (guesses.length === 0) {
    message = "Enter the name of any country to make your first guess.";
    className = "primary-text";
  } else if (guesses.length > 0) {
    const lastGuess = guesses[guesses.length - 1];
    if (lastGuess.adjacent) {
      message = `${lastGuess.properties.ADMIN} is adjacent to the answer!`;
      className = "primary-text";
    } else if (guesses.length === 1) {
      message = "Look around on the globe to help you find your next guess.";
      className = "primary-text";
    } else if (lastGuess.warmer) {
      message = "You're getting warmer! Keep going.";
      className = "primary-text";
    } else {
      message = "You're getting colder! Try a different area.";
      className = "primary-text";
    }
  }

  return (
    <div className={className} style={{ marginTop: '1rem' }}>
      {message}
    </div>
  );
};
export default UserFeedback