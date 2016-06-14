"use strict";
var KeyHandler = (function () {
    function KeyHandler(settings) {
        this.settings = settings;
        this.keysDown = [];
        this.KEY_FORWARDS = settings.forwards;
        this.KEY_BACKWARDS = settings.backwards;
        this.KEY_JUMP = settings.jump;
    }
    KeyHandler.prototype.onKeyDown = function (key) {
        var indexOfKey = this.keysDown.indexOf(key);
        if (indexOfKey === -1) {
            this.keysDown.push(key);
        }
    };
    KeyHandler.prototype.onKeyUp = function (key) {
        var indexOfKey = this.keysDown.indexOf(key);
        if (indexOfKey > -1) {
            this.keysDown.splice(indexOfKey, 1);
        }
    };
    KeyHandler.prototype.isKeyUp = function (key) {
        return (this.keysDown.indexOf(key) >= 0);
    };
    return KeyHandler;
}());
exports.KeyHandler = KeyHandler;
