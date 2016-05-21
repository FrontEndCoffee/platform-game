(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
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
    return Vector;
}());
exports.Vector = Vector;

},{}],2:[function(require,module,exports){
"use strict";
var Vector_1 = require('./Vector');
var foo = new Vector_1.Vector(2, 3);
console.log(foo.scale(2));

},{"./Vector":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdHMvVmVjdG9yLnRzIiwiYXBwL3RzL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtJQUtFLGdCQUFtQixDQUFTLEVBQUUsQ0FBUztRQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUVNLG9CQUFHLEdBQVYsVUFBVyxDQUFTO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsTUFBYztRQUN6QixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRU0scUJBQUksR0FBWDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ2YsQ0FBQztJQUVNLHFCQUFJLEdBQVg7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQTtBQXpCWSxjQUFNLFNBeUJsQixDQUFBOzs7O0FDekJELHVCQUF1QixVQUV2QixDQUFDLENBRmdDO0FBRWpDLElBQUksR0FBRyxHQUFXLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcblxuICBwcml2YXRlIHg6IG51bWJlclxuICBwcml2YXRlIHk6IG51bWJlclxuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gIH1cblxuICBwdWJsaWMgYWRkKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICsgdi5nZXRYKCksIHRoaXMueSArIHYuZ2V0WSgpKVxuICB9XG5cbiAgcHVibGljIHNjYWxlKGZhY3RvcjogbnVtYmVyKTogVmVjdG9yIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKiBmYWN0b3IsIHRoaXMueSAqIGZhY3RvcilcbiAgfVxuXG4gIHB1YmxpYyBnZXRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueFxuICB9XG5cbiAgcHVibGljIGdldFkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy55XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4vVmVjdG9yJ1xuXG5sZXQgZm9vOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDIsIDMpXG5cbmNvbnNvbGUubG9nKGZvby5zY2FsZSgyKSlcbiJdfQ==
