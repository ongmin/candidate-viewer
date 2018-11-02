import React from 'react';
import './style/button.css';

export const Button = ({ onClick, text, styleName, disabled }) => {
  debugger;
  return (
      <button 
        className={"btn" + (styleName ? " " + styleName : "")} 
        onClick={onClick}
        disabled={disabled}>
        {text}
      </button>
  )
};
