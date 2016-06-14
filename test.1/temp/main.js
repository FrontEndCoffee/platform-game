"use strict";
var App_1 = require('./App');
var GameObject_1 = require('./GameObject');
var Vector_1 = require('./Vector');
var DataFile_1 = require('./DataFile');
window.onload = function () {
    new DataFile_1.DataFile('../res/settings.json', function (settings) {
        var platformer = new App_1.App(document, window.innerHeight, window.innerWidth, settings);
        window.onkeydown = function (e) { return platformer.getKeyHandler().onKeyDown(e.keyCode); };
        window.onkeyup = function (e) { return platformer.getKeyHandler().onKeyUp(e.keyCode); };
        new DataFile_1.DataFile('../res/levelfile.json', function (levelfile) {
            levelfile.gameObjects.map(function (obj) {
                platformer.addGameObject(new GameObject_1.GameObject(new Vector_1.Vector(obj[0], obj[1]), new Vector_1.Vector(obj[2], obj[3]), new Vector_1.Vector(obj[4], obj[5]), obj[6]));
            });
        });
        var run = function () {
            platformer.update();
            requestAnimationFrame(run);
        };
        run();
    });
};
