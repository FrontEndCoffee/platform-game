"use strict";
var PhysicsEngine = (function () {
    function PhysicsEngine() {
    }
    // private static GRAVITY: number = 9.81
    PhysicsEngine.prototype.update = function (gameObjects, deltaTime) {
        var dt = deltaTime / 1000;
        gameObjects.map(function (gameObject) {
            gameObject.move(dt);
        });
    };
    PhysicsEngine.isOverlap = function (objA, objB) {
        var objAMinX = objA.getPosition().getX() - objA.getSize().getX() / 2;
        var objAMaxX = objA.getPosition().getX() + objA.getSize().getX() / 2;
        var objAMinY = objA.getPosition().getY() - objA.getSize().getY() / 2;
        var objAMaxY = objA.getPosition().getY() + objA.getSize().getY() / 2;
        var objBMinX = objB.getPosition().getX() - objB.getSize().getX() / 2;
        var objBMaxX = objB.getPosition().getX() + objB.getSize().getX() / 2;
        var objBMinY = objB.getPosition().getY() - objB.getSize().getY() / 2;
        var objBMaxY = objB.getPosition().getY() + objB.getSize().getY() / 2;
        var collideX = ((objAMaxX > objBMinX && objAMaxX < objBMaxX) ||
            (objAMinX > objBMinX && objAMinX < objBMaxX));
        var collideY = ((objAMaxY > objBMinY && objAMaxY < objBMaxY) ||
            (objAMinY > objBMinY && objAMinY < objBMaxY));
        return (collideX && collideY);
    };
    return PhysicsEngine;
}());
exports.PhysicsEngine = PhysicsEngine;
