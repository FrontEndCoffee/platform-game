"use strict";
var Vector_1 = require('./Vector');
var GameObject = (function () {
    function GameObject(position, velocity, size, color) {
        this.position = position || new Vector_1.Vector(0, 0);
        this.velocity = velocity || new Vector_1.Vector(0, 0);
        this.size = size || new Vector_1.Vector(5, 5);
        this.color = color || '#f00';
    }
    GameObject.prototype.move = function (seconds) {
        this.position = this.position.add(this.velocity.scale(seconds));
    };
    GameObject.prototype.accelerate = function (dVel) {
        this.velocity = this.velocity.add(dVel);
    };
    GameObject.prototype.translate = function (dPos) {
        this.position = this.position.add(dPos);
    };
    GameObject.prototype.setSize = function (s) {
        this.size = s;
    };
    GameObject.prototype.getSize = function () {
        return this.size;
    };
    GameObject.prototype.setColor = function (c) {
        this.color = c;
    };
    GameObject.prototype.getColor = function () {
        return this.color;
    };
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    GameObject.prototype.getVelocity = function () {
        return this.velocity;
    };
    return GameObject;
}());
exports.GameObject = GameObject;
