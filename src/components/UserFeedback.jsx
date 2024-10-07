import React from 'react';
import { getFeedbackMessage } from '../utils/feedbackUtils';

function UserFeedback({ win, error, guesses }) {
  const { message, className } = getFeedbackMessage(win, error, guesses);

  return (
    <div className={className} style={{ marginTop: '1rem' }}>
      {message}
    </div>
  );
}

export default React.memo(UserFeedback);