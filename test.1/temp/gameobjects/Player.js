"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject_1 = require('../GameObject');
var Vector_1 = require('../Vector');
var PhysicsEngine_1 = require('../PhysicsEngine');
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(keyHandler, gameObjects, settings) {
        _super.call(this, new Vector_1.Vector(settings.position[0], settings.position[1]), new Vector_1.Vector(settings.velocity[0], settings.velocity[1]), new Vector_1.Vector(settings.size[0], settings.size[1]), settings.color);
        this.settings = settings;
        this.keyHandler = keyHandler;
        this.gameObjects = gameObjects;
        this.isFalling = false;
    }
    Player.prototype.update = function (time) {
        var isFwrd = this.keyHandler.isKeyUp(this.keyHandler.KEY_FORWARDS);
        var isBwrd = this.keyHandler.isKeyUp(this.keyHandler.KEY_BACKWARDS);
        var isJump = this.keyHandler.isKeyUp(this.keyHandler.KEY_JUMP);
        if (isFwrd) {
            this.accelerate(new Vector_1.Vector(this.settings.lateralAcceleration, 0));
        }
        if (isBwrd) {
            this.accelerate(new Vector_1.Vector(-this.settings.lateralAcceleration, 0));
        }
        if (isJump && (!this.isFlying() || !this.isFalling)) {
            this.accelerate(new Vector_1.Vector(0, this.settings.altitudinalAcceleration));
        }
        this.move(time / 1000);
    };
    Player.prototype.move = function (time) {
        _super.prototype.move.call(this, time);
        if (Math.abs(this.velocity.getX()) < this.settings.lateralAcceleration) {
            this.velocity.setX(0);
        }
        if (!this.keyHandler.isKeyUp(this.keyHandler.KEY_FORWARDS) &&
            !this.keyHandler.isKeyUp(this.keyHandler.KEY_BACKWARDS) &&
            this.velocity.getX() !== 0) {
            var plusMinus = this.velocity.getX() / Math.abs(this.velocity.getX());
            this.velocity.setX(this.velocity.getX() - this.settings.lateralAcceleration * plusMinus);
        }
        // gravity
        this.accelerate(new Vector_1.Vector(0, -this.settings.gravity));
        this.executeHitDetectionSequence(time);
        // solid check (remove after hitdetection has been implemented)
        var bottomPos = (this.position.getY() - this.size.getY() / 2);
        if (bottomPos < 0) {
            this.position.setY(this.size.getY() / 2);
            this.velocity.setY(0);
        }
    };
    Player.prototype.accelerate = function (dVel) {
        _super.prototype.accelerate.call(this, dVel);
        if (Math.abs(this.velocity.getX()) > this.settings.maxLateralVelocity) {
            var plusMinus = Math.abs(this.velocity.getX()) / this.velocity.getX();
            this.velocity.setX(this.settings.maxLateralVelocity * plusMinus);
        }
        if (Math.abs(this.velocity.getY()) > this.settings.maxAltitudinalVelocity) {
            var factor = Math.abs(this.velocity.getY()) / this.settings.maxAltitudinalVelocity;
            this.velocity.setY(this.velocity.getY() / factor);
        }
    };
    Player.prototype.executeHitDetectionSequence = function (time) {
        var _this = this;
        var x = 0;
        if (this.velocity.getY() < x) {
            // player is falling
            this.gameObjects.map(function (obj) {
                if (PhysicsEngine_1.PhysicsEngine.isOverlap(_this, obj)) {
                    var playerMinY = _this.getPosition().getY() - _this.getSize().getY() / 2;
                    var blockMaxY = obj.getPosition().getY() + _this.getSize().getY() / 2;
                    var isInTopPartOfBlock = ((blockMaxY - playerMinY) <= -_this.velocity.getY());
                    if (isInTopPartOfBlock) {
                        _this.position.setY(blockMaxY + obj.getSize().getY() / 2);
                        _this.velocity.setY(0);
                        _this.isFalling = false;
                    }
                    else {
                        _this.isFalling = true;
                    }
                }
            });
        }
        console.log(this.isFalling);
    };
    Player.prototype.isFlying = function () {
        return (this.position.getY() - this.size.getY() / 2) > 0;
    };
    return Player;
}(GameObject_1.GameObject));
exports.Player = Player;
