"use strict";
var RenderEngine_1 = require('./RenderEngine');
var PhysicsEngine_1 = require('./PhysicsEngine');
var Player_1 = require('./gameobjects/Player');
var KeyHandler_1 = require('./KeyHandler');
var App = (function () {
    function App(doc, height, width, settings) {
        this.settings = settings;
        this.engine = new RenderEngine_1.RenderEngine(doc, height, width, settings.display);
        this.physics = new PhysicsEngine_1.PhysicsEngine();
        this.keyHandler = new KeyHandler_1.KeyHandler(settings.keys);
        this.gameObjects = [];
        this.latestFrameTimestamp = this.getTime();
        this.player = new Player_1.Player(this.keyHandler, this.gameObjects, settings.player);
    }
    App.prototype.update = function () {
        var _this = this;
        var deltaTime = this.getTime() - this.latestFrameTimestamp;
        this.latestFrameTimestamp = this.getTime();
        this.physics.update(this.gameObjects, deltaTime);
        this.player.update(deltaTime);
        this.engine.clearFrame();
        this.gameObjects.forEach(function (v) {
            _this.engine.draw(v);
        });
        this.engine.draw(this.player);
    };
    App.prototype.addGameObject = function (obj) {
        this.gameObjects.push(obj);
    };
    App.prototype.getKeyHandler = function () {
        return this.keyHandler;
    };
    App.prototype.getEngine = function () {
        return this.engine;
    };
    App.prototype.getTime = function () {
        return new Date().getTime();
    };
    return App;
}());
exports.App = App;
