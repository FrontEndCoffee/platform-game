'use strict';

var vector = function vector(xValue, yValue) {

  var x = xValue,
      y = yValue;

  return {
    'add': function add(vector2) {
      return vector(x + vector2.getX(), y + vector2.getY());
    },
    'scale': function scale(factor) {
      return vector(x * factor, y * factor);
    },
    'getX': function getX() {
      return x;
    },
    'getY': function getY() {
      return y;
    }
  };
};

module.exports = vector;