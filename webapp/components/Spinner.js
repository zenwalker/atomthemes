import React from 'react';
import '../styles/spinner.css';

const Spinner = (props) => {
  return (
    <svg className="spinner" width="50px" height="50px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="spinner_path" fill="none" strokeWidth="5" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  );
};

export default Spinner;
