'use strict';

var renderEngine = function renderEngine() {

  var canvas = void 0,
      ctx = void 0;

  var height = window.innerHeight,
      width = window.innerWidth,
      clearFrame = function clearFrame() {

    ctx.clearRect(0, 0, width, height);
  };

  return {
    'init': function init() {

      canvas = document.createElement('canvas');
      canvas.height = height;
      canvas.width = width;
      ctx = canvas.getContext('2d');
      document.body.appendChild(canvas);
    },
    'render': function render(gObject) {

      ctx.fillStyle = gObject.getColor();
      ctx.fillRect(gObject.getPosition().getX(), gObject.getPosition().getY(), gObject.getSize().getX(), gObject.getSize().getY());
    },
    'getHeight': function getHeight() {
      return height;
    },
    'getWidth': function getWidth() {
      return width;
    },
    'getContext': function getContext() {
      return ctx;
    },
    'getCanvas': function getCanvas() {
      return canvas;
    }
  };
};