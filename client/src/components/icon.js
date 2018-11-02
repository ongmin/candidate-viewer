import React from 'react';

const angleLeft = require('../assets/angle-left.svg');
const angleRight = require('../assets/angle-right.svg');

const getIcon = name => {
  switch (name) {
    case "angleLeft":
      return angleLeft;
    case "angleRight": 
      return angleRight;
    default:
      return "";
  }
}

const getAlt = name => {
  switch (name) {
    case "angleLeft":
      return "Previous Page";
    case "angleRight": 
      return "Next Page";
    default:
      return "";
  }
}

export const Icon = ({ name }) => {
  return (
    <img src={getIcon(name)} className="icon" alt={getAlt(name)} />
  )
}