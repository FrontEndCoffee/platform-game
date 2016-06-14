"use strict";
var RenderEngine = (function () {
    function RenderEngine(document, windowHeight, windowWidth, displaySettings) {
        this.settings = displaySettings;
        this.height = windowHeight;
        this.width = windowWidth;
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.ctx = this.canvas.getContext('2d');
        // config canvas
        var scale = this.height / this.settings.height;
        this.ctx.translate(this.settings.margin, this.height);
        this.ctx.scale(scale, -scale);
        this.height /= scale;
        this.width /= scale;
        document.body.appendChild(this.canvas);
    }
    RenderEngine.prototype.draw = function (obj) {
        this.ctx.fillStyle = obj.getColor();
        this.ctx.fillRect(obj.getPosition().getX() - obj.getSize().getX() / 2, obj.getPosition().getY() - obj.getSize().getY() / 2, obj.getSize().getX(), obj.getSize().getY());
    };
    RenderEngine.prototype.clearFrame = function () {
        this.ctx.clearRect(-this.settings.margin, 0, this.width, this.height);
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
    return RenderEngine;
}());
exports.RenderEngine = RenderEngine;
