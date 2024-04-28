import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ imageUrl, alt, onClose }) => {
  console.log(imageUrl);
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleCloseModal}>
      <div className="modal">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
