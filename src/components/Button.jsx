import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import './styles.css';

// const Button = ({ onLoadMore }) => (
//   <div className="buttonDiv">
//     <button type="button" className="button" onClick={onLoadMore}>
//       Load more
//     </button>
//   </div>
// );
const Button = ({ onLoadMore, loading }) => (
  <div className="buttonDiv">
    <button type="button" className="button" onClick={onLoadMore}>
      Load More
    </button>
    {loading && <Loader />}
  </div>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
