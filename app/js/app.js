'use strict';

var app = function app() {

  var engine = void 0;

  var gameObjects = [],
      keysDown = [];

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
    },
    'getEngine': function getEngine() {
      return engine;
    }
  };
};

var platformer = app();

window.onload = platformer.init;