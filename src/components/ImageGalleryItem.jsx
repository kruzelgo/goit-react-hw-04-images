import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ImageGalleryItem = ({ id, imageUrl, onClick }) => (
  <li className="imageGalleryItem" key={id} onClick={() => onClick(id)}>
    <img src={imageUrl} alt="" id={id} className="imageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
