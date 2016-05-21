(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Vector_1 = require('./Vector');
var GameObject = (function () {
    function GameObject(position, velocity, size) {
        this.position = position || new Vector_1.Vector(0, 0);
        this.velocity = velocity || new Vector_1.Vector(0, 0);
        this.size = size || new Vector_1.Vector(5, 5);
        this.color = '#f00';
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

},{"./Vector":3}],2:[function(require,module,exports){
"use strict";
var RenderEngine = (function () {
    function RenderEngine(document, windowHeight, windowWidth) {
        this.height = windowHeight;
        this.width = windowWidth;
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }
    RenderEngine.prototype.draw = function (obj) {
        this.ctx.fillStyle = obj.getColor();
        this.ctx.fillRect(obj.getPosition().getX(), obj.getPosition().getY(), obj.getSize().getX(), obj.getSize().getY());
    };
    RenderEngine.prototype.getHeight = function () {
        return this.height;
    };
    RenderEngine.prototype.getWidth = function () {
        return this.width;
    };
    RenderEngine.prototype.getContext = function () {
        return this.ctx;
    };
    RenderEngine.prototype.getCanvas = function () {
        return this.canvas;
    };
    RenderEngine.prototype.clearFrame = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    return RenderEngine;
}());
exports.RenderEngine = RenderEngine;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
var RenderEngine_1 = require('./RenderEngine');
var GameObject_1 = require('./GameObject');
var Vector_1 = require('./Vector');
var App = (function () {
    function App(doc, height, width) {
        this.engine = new RenderEngine_1.RenderEngine(doc, height, width);
        this.keysDown = [];
        this.gameObjects = [];
    }
    App.prototype.onKeyDown = function (key) {
        var indexOfKey = this.keysDown.indexOf(key);
        if (indexOfKey === -1) {
            this.keysDown.push(key);
        }
    };
    App.prototype.onKeyUp = function (key) {
        var indexOfKey = this.keysDown.indexOf(key);
        if (indexOfKey > -1) {
            this.keysDown.splice(indexOfKey, 1);
        }
    };
    App.prototype.getKeysDown = function () {
        return this.keysDown;
    };
    App.prototype.getEngine = function () {
        return this.engine;
    };
    return App;
}());
// init code
window.onload = function () {
    var platformer = new App(document, window.innerHeight, window.innerWidth);
    console.log(platformer);
    /**
      Debug code
    */
    var apple = new GameObject_1.GameObject(new Vector_1.Vector(10, 10), new Vector_1.Vector(10, 10), new Vector_1.Vector(10, 10));
    platformer.getEngine().draw(apple);
};

},{"./GameObject":1,"./RenderEngine":2,"./Vector":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdHMvR2FtZU9iamVjdC50cyIsImFwcC90cy9SZW5kZXJFbmdpbmUudHMiLCJhcHAvdHMvVmVjdG9yLnRzIiwiYXBwL3RzL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSx1QkFBdUIsVUFFdkIsQ0FBQyxDQUZnQztBQUVqQztJQU9FLG9CQUFZLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxJQUFZO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLGVBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxlQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO0lBQ3JCLENBQUM7SUFFTSx5QkFBSSxHQUFYLFVBQVksT0FBZTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDN0IsQ0FBQTtJQUNILENBQUM7SUFFTSwrQkFBVSxHQUFqQixVQUFrQixJQUFZO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVNLDhCQUFTLEdBQWhCLFVBQWlCLElBQVk7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRU0sNEJBQU8s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UUFDekIsQ0FBQztJQUNILENBQUM7SUFFTSxxQkFBTyxHQUFkLFVBQWUsR0FBVztRQUN4QixJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuRCxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLHlCQUFXLEdBQWxCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztJQUVNLHVCQUFTLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVILFVBQUM7QUFBRCxDQWxDQSxBQWtDQyxJQUFBO0FBSUQsWUFBWTtBQUVaLE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFDZCxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FDdEIsUUFBUSxFQUNSLE1BQU0sQ0FBQyxXQUFXLEVBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQ2xCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRXZCOztNQUVFO0lBQ0YsSUFBSSxLQUFLLEdBQWUsSUFBSSx1QkFBVSxDQUNwQyxJQUFJLGVBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ2xCLElBQUksZUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFDbEIsSUFBSSxlQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUNuQixDQUFDO0lBQ0YsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9WZWN0b3InXG5cbmV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0IHtcblxuICBwcml2YXRlIHBvc2l0aW9uOiBWZWN0b3JcbiAgcHJpdmF0ZSB2ZWxvY2l0eTogVmVjdG9yXG4gIHByaXZhdGUgc2l6ZTogVmVjdG9yXG4gIHByaXZhdGUgY29sb3I6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IsIHZlbG9jaXR5OiBWZWN0b3IsIHNpemU6IFZlY3Rvcikge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbiB8fCBuZXcgVmVjdG9yKDAsIDApXG4gICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5IHx8IG5ldyBWZWN0b3IoMCwgMClcbiAgICB0aGlzLnNpemUgPSBzaXplIHx8IG5ldyBWZWN0b3IoNSwgNSlcbiAgICB0aGlzLmNvbG9yID0gJyNmMDAnXG4gIH1cblxuICBwdWJsaWMgbW92ZShzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQoXG4gICAgICB0aGlzLnZlbG9jaXR5LnNjYWxlKHNlY29uZHMpXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFjY2VsZXJhdGUoZFZlbDogVmVjdG9yKTogdm9pZCB7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKGRWZWwpXG4gIH1cblxuICBwdWJsaWMgdHJhbnNsYXRlKGRQb3M6IFZlY3Rvcik6IHZvaWQge1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZChkUG9zKVxuICB9XG5cbiAgcHVibGljIHNldFNpemUoczogVmVjdG9yKTogdm9pZCB7XG4gICAgdGhpcy5zaXplID0gc1xuICB9XG5cbiAgcHVibGljIGdldFNpemUoKTogVmVjdG9yIHtcbiAgICByZXR1cm4gdGhpcy5zaXplXG4gIH1cblxuICBwdWJsaWMgc2V0Q29sb3IoYzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvciA9IGNcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbG9yXG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oKTogVmVjdG9yIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvblxuICB9XG5cbiAgcHVibGljIGdldFZlbG9jaXR5KCk6IFZlY3RvciB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHlcbiAgfVxufVxuIiwiaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4vR2FtZU9iamVjdCdcblxuZXhwb3J0IGNsYXNzIFJlbmRlckVuZ2luZSB7XG5cbiAgcHJpdmF0ZSBjYW52YXM6IGFueVxuICBwcml2YXRlIGN0eDogYW55XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXJcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyXG5cbiAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgd2luZG93SGVpZ2h0OiBudW1iZXIsIHdpbmRvd1dpZHRoOiBudW1iZXIpIHtcbiAgICB0aGlzLmhlaWdodCA9IHdpbmRvd0hlaWdodFxuICAgIHRoaXMud2lkdGggPSB3aW5kb3dXaWR0aFxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodFxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpXG4gIH1cblxuICBwdWJsaWMgZHJhdyhvYmo6IEdhbWVPYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBvYmouZ2V0Q29sb3IoKVxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgb2JqLmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxuICAgICAgb2JqLmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxuICAgICAgb2JqLmdldFNpemUoKS5nZXRYKCksXG4gICAgICBvYmouZ2V0U2l6ZSgpLmdldFkoKVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5oZWlnaHRcbiAgfVxuXG4gIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpZHRoXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29udGV4dCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmN0eFxuICB9XG5cbiAgcHVibGljIGdldENhbnZhcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckZyYW1lKCk6IHZvaWQge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgfVxuXG59XG4iLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcblxuICBwcml2YXRlIHg6IG51bWJlclxuICBwcml2YXRlIHk6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgfVxuXG4gIHB1YmxpYyBhZGQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKyB2LmdldFgoKSwgdGhpcy55ICsgdi5nZXRZKCkpXG4gIH1cblxuICBwdWJsaWMgc2NhbGUoZmFjdG9yOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIGZhY3RvciwgdGhpcy55ICogZmFjdG9yKVxuICB9XG5cbiAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54XG4gIH1cblxuICBwdWJsaWMgZ2V0WSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnlcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVuZGVyRW5naW5lIH0gZnJvbSAnLi9SZW5kZXJFbmdpbmUnXG5pbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSAnLi9HYW1lT2JqZWN0J1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9WZWN0b3InXG5cbmNsYXNzIEFwcCB7XG5cbiAgcHJpdmF0ZSBlbmdpbmU6IFJlbmRlckVuZ2luZVxuICBwcml2YXRlIGtleXNEb3duOiBudW1iZXJbXVxuICBwcml2YXRlIGdhbWVPYmplY3RzOiBHYW1lT2JqZWN0W11cblxuICBjb25zdHJ1Y3Rvcihkb2M6IGFueSwgaGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpIHtcbiAgICB0aGlzLmVuZ2luZSA9IG5ldyBSZW5kZXJFbmdpbmUoZG9jLCBoZWlnaHQsIHdpZHRoKVxuICAgIHRoaXMua2V5c0Rvd24gPSBbXVxuICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBbXVxuICB9XG5cbiAgcHVibGljIG9uS2V5RG93bihrZXk6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBpbmRleE9mS2V5OiBudW1iZXIgPSB0aGlzLmtleXNEb3duLmluZGV4T2Yoa2V5KVxuICAgIGlmIChpbmRleE9mS2V5ID09PSAtMSkge1xuICAgICAgdGhpcy5rZXlzRG93bi5wdXNoKGtleSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25LZXlVcChrZXk6IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBpbmRleE9mS2V5OiBudW1iZXIgPSB0aGlzLmtleXNEb3duLmluZGV4T2Yoa2V5KVxuICAgIGlmIChpbmRleE9mS2V5ID4gLTEpIHtcbiAgICAgIHRoaXMua2V5c0Rvd24uc3BsaWNlKGluZGV4T2ZLZXksIDEpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEtleXNEb3duKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzRG93blxuICB9XG5cbiAgcHVibGljIGdldEVuZ2luZSgpOiBSZW5kZXJFbmdpbmUge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZVxuICB9XG5cbn1cblxuXG5cbi8vIGluaXQgY29kZVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBsZXQgcGxhdGZvcm1lciA9IG5ldyBBcHAoXG4gICAgZG9jdW1lbnQsXG4gICAgd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHdpbmRvdy5pbm5lcldpZHRoXG4gIClcbiAgY29uc29sZS5sb2cocGxhdGZvcm1lcilcblxuICAvKipcbiAgICBEZWJ1ZyBjb2RlXG4gICovXG4gIGxldCBhcHBsZTogR2FtZU9iamVjdCA9IG5ldyBHYW1lT2JqZWN0KFxuICAgIG5ldyBWZWN0b3IoMTAsIDEwKSxcbiAgICBuZXcgVmVjdG9yKDEwLCAxMCksXG4gICAgbmV3IFZlY3RvcigxMCwgMTApXG4gICk7XG4gIHBsYXRmb3JtZXIuZ2V0RW5naW5lKCkuZHJhdyhhcHBsZSlcbn1cbiJdfQ==
