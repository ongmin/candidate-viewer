import React from 'react';
import './style/button.css';

export const Button = ({ onClick, text }) => {
  return (
      <button className="btn" onClick={onClick}>{text}</button>
  )
};
