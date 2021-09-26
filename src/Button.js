import React from 'react';
import './Button.css';
const Button = (props) => {
  return (
    <div className='btn'>
      <input type='button' value={props.value} onClick={props.changePage} />
    </div>
  );
};

export default Button;
