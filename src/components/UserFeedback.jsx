import React from 'react'

const UserFeedback = ({win, error}) => {

  let message;
  let className;

  if (win) {
    message = "Woohoo! You've found the mystery country.";
    className = "success";
  } else if (error) {
    message = "There is an error";
    className = "error-text";
  } else {
    message = "Enter the name of any country to make your first guess.";
    className = "primary-text";
  }

  return <div className={className} style={{ marginTop: '1rem' }}>{message}</div>;

}

export default UserFeedback