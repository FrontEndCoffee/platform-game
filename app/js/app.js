'use strict';

var app = function app() {

  var gameObjects = [],
      keysDown = [5],
      engine = void 0;

  return {
    'init': function init() {

      engine = renderEngine();
      engine.init();
    },
    'onKeyDown': function onKeyDown(event) {

      var key = event.keyCode;

      if (keysDown.find(function (v) {
        return v === key;
      }) === undefined) {
        keysDown.push(key);
      }
    }
  };
};

var platformer = app();

window.onload = platformer.init;