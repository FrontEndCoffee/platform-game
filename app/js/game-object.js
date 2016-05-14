'use strict';

var gameObject = function gameObject(p, v, s) {

  var position = p || vector(0, 0),
      velocity = v || vector(0, 0),
      size = s || vector(5, 5),
      color = '#f00';

  return {
    'move': function move(seconds) {
      return position = position.add(velocity.scale(seconds));
    },
    'accelerate': function accelerate(vector) {
      return velocity = velocity.scale(vector);
    },
    'transform': function transform(vector) {
      return position = position.add(vector);
    },
    'setSize': function setSize(vector) {
      return size = vector;
    },
    'getSize': function getSize() {
      return size;
    },
    'setColor': function setColor(string) {
      return color = string;
    },
    'getColor': function getColor() {
      return color;
    },
    'getPosition': function getPosition() {
      return position;
    },
    'getVelocity': function getVelocity() {
      return velocity;
    }
  };
};