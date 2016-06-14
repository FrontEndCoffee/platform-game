"use strict";
var Vector = (function () {
    function Vector(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.getX(), this.y + v.getY());
    };
    Vector.prototype.scale = function (factor) {
        return new Vector(this.x * factor, this.y * factor);
    };
    Vector.prototype.getX = function () {
        return this.x;
    };
    Vector.prototype.getY = function () {
        return this.y;
    };
    Vector.prototype.setX = function (x) {
        this.x = x;
    };
    Vector.prototype.setY = function (y) {
        this.y = y;
    };
    return Vector;
}());
exports.Vector = Vector;
