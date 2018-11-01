import React from 'react';
import './style/button.css';

export const Button = ({ onClick, text, styleName }) => {
  return (
      <button className={"btn" + (styleName ? " " + styleName : "")} onClick={onClick}>{text}</button>
  )
};
