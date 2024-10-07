const messages = {
    win: "Woohoo! You've found the mystery country.",
    initial: "Enter the name of any country to make your first guess.",
    adjacent: (country) => `${country} is adjacent to the answer!`,
    firstGuess: "Look around on the globe to help you find your next guess.",
    warmer: "You're getting warmer! Keep going.",
    colder: "You're getting colder! Try a different area."
  };
  
  export function getFeedbackMessage(win, error, guesses) {
    if (win) {
      return { message: messages.win, className: "success" };
    } 
    if (error) {
      return { message: error, className: "error-text" };
    } 
    if (guesses.length === 0) {
      return { message: messages.initial, className: "primary-text" };
    }
  
    const lastGuess = guesses[guesses.length - 1];
    let message;
    if (lastGuess.adjacent) {
      message = messages.adjacent(lastGuess.properties.ADMIN);
    } else if (guesses.length === 1) {
      message = messages.firstGuess;
    } else {
      message = lastGuess.warmer ? messages.warmer : messages.colder;
    }
    
    return { message, className: "primary-text" };
  }