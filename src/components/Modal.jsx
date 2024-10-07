import React from 'react';

function Modal({ isOpen, onClose, onStartNewGame }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="button modal-close-btn" onClick={onClose}>&times;</button>
        <h3>Do you want to start a new game?</h3>
        <div>
          <button className='button modal-btn-success' onClick={onStartNewGame}>Yes</button>
          <button className='button modal-btn-error' onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Modal);