import React from 'react';
import './style/validation.css';

const getError = (type, maxSize) => {
  switch (type) {
    case "missingInput":
      return "Please input a page number";
    case "outOfRange": 
      return "Please input a page number between 1 and " + maxSize;
    default:
      return "";
  }
}

export const ValidationText = ({ type, maxSize }) => {
  return (
    <span className="validation">{getError(type, maxSize)}</span>
  )
}