import React from 'react';

const angleLeft = require('../assets/angle-left.svg');
const angleRight = require('../assets/angle-right.svg');

const getIcon = icon => {
  switch (icon) {
    case "angleLeft":
      return angleLeft;
    case "angleRight": 
      return angleRight;
  }
}

export const Icon = ({ name }) => {
  return (
    <img src={getIcon(name)} className="icon" />
  )
}