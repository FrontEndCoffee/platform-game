'use strict';

var vector = function vector(xValue, yValue) {

  var x = xValue,
      y = yValue;

  return {
    'add': function add(vector) {
      return vector(x + vector.getX(), y + vector.getY());
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