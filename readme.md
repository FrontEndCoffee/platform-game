# Platform Game 
[![Build Status](https://travis-ci.org/FrontEndCoffee/platform-game.svg?branch=master)](https://travis-ci.org/FrontEndCoffee/platform-game)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)]()
[![Stories in Ready](https://badge.waffle.io/FrontEndCoffee/platform-game.svg?label=ready&title=Ready)](http://waffle.io/FrontEndCoffee/platform-game)

Years ago I built a platform game in javascript. However, at the time I didn't know JavaScript that well, and my code looked like shit. It's barely readable, and not at all scalable. In this repo I will rewrite that code.

#### This is the old file

```js

config = {
    "fps": 60,
    "autoStart": true,
    "autoPlayMusic": true,
    "levelHeight": 500,
    "levelWidth": 2000,
    "levelMargin": 100,
    "volume": 0.25,
    "keys": {
        "left": 37,
        "right": 39,
        "jump": 38,
        "down": 40,
        "confirm": 13,
        "escape": 27,
        "pause": 80
    }
};
window.addEventListener("load", function() {
    canvas = document.getElementById("myCanvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext("2d");
    pack = levelpack;
    config.autoStart ? init() : console.log("%c WARNING!: Manual initialising required!", "background:#aaa;color:#822;");
});
function init() {
    console.log("%c Initialising...", "background:#444;color:#bada55;");
    scale = canvas.height / (config.levelHeight / 0.8);
    ctx.scale(scale, scale);
    ctx.translate(config.levelMargin, config.levelHeight);
    soundtrack = document.getElementById("soundtrack");
    soundtrack.volume = config.volume;
    if (config.autoPlayMusic)
        soundtrack.play();
    data = {
        "layers": [],
        "scrollX": 0 - config.levelMargin,
        "scrollY": 0,
        "player": new Player(),
        "screen": 0,
        "tries": 0,
        "levelInt": 0,
        "exit": {},
        "keysdown": {
            "left": false,
            "right": false,
            "jump": false
        }
    };
    menu = {
        "amountOfOptions": 4,
        "bgColor": "#ececec",
        "bgObjects": [],
        "selection": 0
    };
    selectLevel(data, pack, data.levelInt);
    window.addEventListener("keydown", function(e) {
        if (e.keyCode == config.keys.left)
            data.keysdown.left = true;
        if (e.keyCode == config.keys.right)
            data.keysdown.right = true;
        if (e.keyCode == config.keys.jump)
            data.keysdown.jump = true;
        if (e.keyCode == config.keys.pause)
            (soundtrack.paused) ? soundtrack.play() : soundtrack.pause();
        if (e.keyCode == config.keys.jump && data.screen == 0) {
            menu.selection -= 1;
            if (menu.selection < 0)
                menu.selection = menu.amountOfOptions - 1;
        }
        if (e.keyCode == config.keys.down && data.screen == 0) {
            menu.selection += 1;
            if (menu.selection >= menu.amountOfOptions)
                menu.selection = 0;
        }
        if (e.keyCode == config.keys.confirm && data.screen == 0) {
            if (menu.selection == 0)
                data.screen = 1;
        }
        if (e.keyCode == config.keys.escape && (data.screen == 1)) {
            data.screen = 0;
        }
    });
    window.addEventListener("keyup", function(e) {
        if (e.keyCode == config.keys.left)
            data.keysdown.left = false;
        if (e.keyCode == config.keys.right)
            data.keysdown.right = false;
        if (e.keyCode == config.keys.jump)
            data.keysdown.jump = false;
    });
    var firstTime = true;
    var oldTime = new Date().getTime();
    var totalDTime = 0;
    var frame = 0;
    currentFPS = 0;
    clock = setInterval(function() {
        frame++
        if (firstTime) {
            firstTime = false;
            console.log("%c Initialisation sequence complete!", "background:#444;color:#bada55;");
        }
        dTime = new Date().getTime() - oldTime;
        oldTime = new Date().getTime();
        totalDTime += dTime;
        if (frame % 10 == 0) {
            currentFPS = Math.round(10000 / totalDTime);
            totalDTime = 0;
        }
        if (data.screen == 0) {
            ctx.clearRect(-config.levelMargin, 0.2 * canvas.height / scale, canvas.width / scale, -config.levelHeight / 0.8);
            ctx.fillStyle = menu.bgColor;
            ctx.fillRect(-config.levelMargin, 0.2 * canvas.height / scale, canvas.width / scale, -config.levelHeight / 0.8);
            if (Random(0, 10 + 2 * menu.bgObjects.length) == 0)
                menu.bgObjects.push({
                    "size": Random(90, 110),
                    "y": Random(-config.levelHeight / 0.8, config.levelHeight),
                    "distance": Random(0, 50),
                    "x": -config.levelMargin - 60
                });
            for (var i = 0; i < menu.bgObjects.length; i++) {
                menu.bgObjects[i].x += 300 * (60 - menu.bgObjects[i].distance) / 50 * dTime / 1000;
                if (menu.bgObjects[i].x > (canvas.width - config.levelMargin + menu.bgObjects[i].size / 2)) {
                    menu.bgObjects.splice(i, 1);
                } else {
                    ctx.fillStyle = "rgba(" + (230 - menu.bgObjects[i].distance) + "," + (230 - menu.bgObjects[i].distance) + "," + (230 - menu.bgObjects[i].distance) + ",0.8)";
                    var size = (menu.bgObjects[i].distance + 10) / 50 * menu.bgObjects[i].size;
                    ctx.fillRect(menu.bgObjects[i].x - size / 2, menu.bgObjects[i].y - size / 2, size, size);
                }
            }
            ctx.font = "50px Orbitron";
            ctx.fillStyle = "#000";
            ctx.fillText("UNNAMED PLATFORMER", 20, -350);
            (menu.selection == 0) ? ctx.fillStyle = "#ccc" : ctx.fillStyle = "#000";
            (menu.selection == 0) ? ctx.fillRect(40, -310, canvas.width, 50) : ctx.fillRect(45, -310, canvas.width, 50);
            (menu.selection == 0) ? ctx.fillStyle = "#000" : ctx.fillStyle = "#fff";
            ctx.font = "30px Play";
            ctx.fillText("PLAY", 60, -275);
            (menu.selection == 1) ? ctx.fillStyle = "#ccc" : ctx.fillStyle = "#000";
            (menu.selection == 1) ? ctx.fillRect(50, -250, canvas.width, 50) : ctx.fillRect(55, -250, canvas.width, 50);
            (menu.selection == 1) ? ctx.fillStyle = "#000" : ctx.fillStyle = "#fff";
            ctx.font = "30px Play";
            ctx.fillText("CREATE", 70, -215);
            (menu.selection == 2) ? ctx.fillStyle = "#ccc" : ctx.fillStyle = "#000";
            (menu.selection == 2) ? ctx.fillRect(60, -190, canvas.width, 50) : ctx.fillRect(65, -190, canvas.width, 50);
            (menu.selection == 2) ? ctx.fillStyle = "#000" : ctx.fillStyle = "#fff";
            ctx.font = "30px Play";
            ctx.fillText("OPTIONS", 80, -155);
            (menu.selection == 3) ? ctx.fillStyle = "#ccc" : ctx.fillStyle = "#000";
            (menu.selection == 3) ? ctx.fillRect(70, -130, canvas.width, 50) : ctx.fillRect(75, -130, canvas.width, 50);
            (menu.selection == 3) ? ctx.fillStyle = "#000" : ctx.fillStyle = "#fff";
            ctx.font = "30px Play";
            ctx.fillText("CREDITS", 90, -95);
        }
        if ((data.keysdown.right || data.keysdown.left) && !data.player.inAir) {
            data.player.speed += data.player.acceleration;
            if (data.player.speed > data.player.terminalVelocity) {
                data.player.speed = data.player.terminalVelocity
            }
        }
        if (!data.keysdown.right && !data.keysdown.left)
            data.player.speed = 0;
        if (data.keysdown.right && (data.player.x + data.player.width / 2) < config.levelWidth)
            data.player.x += data.player.speed * dTime / 1000;
        if (data.keysdown.left && (data.player.x - data.player.width / 2) > 0)
            data.player.x -= data.player.speed * dTime / 1000;
        if (data.keysdown.jump && !data.player.inAir)
            data.player.vertVelocity = data.player.jumpSpeed;
        if (data.player.vertVelocity > 10 && !data.keysdown.jump)
            data.player.vertVelocity -= 10;
        if (data.screen == 1) {
            data.player.y += data.player.vertVelocity * dTime / 1000;
            data.player.inAir = true;
            for (var i = 0; i < data.layers[0].length; i++) {
                if (data.layers[0][i].rendertype == "cube") {
                    var cube = data.layers[0][i];
                    if ((cube.x - cube.width / 2 < data.player.x + data.player.width / 2 && cube.x + cube.width / 2 > data.player.x - data.player.width / 2) && data.player.vertVelocity <= 0 && data.player.y >= cube.y + cube.height / 2 + data.player.vertVelocity * dTime / 1000 && data.player.y <= cube.y + cube.height / 2 - data.player.vertVelocity * dTime / 1000) {
                        data.player.y = cube.y + cube.height / 2;
                        data.player.vertVelocity = 0;
                        data.player.inAir = false;
                    }
                    if (cube.x - cube.width / 2 < data.player.x + data.player.width / 2 && cube.x + cube.width / 2 > data.player.x - data.player.width / 2 && cube.y - cube.height / 2 < data.player.y + data.player.height && cube.y + cube.height / 2 > data.player.y) {
                        if (data.player.x > cube.x) {
                            data.player.x = cube.x + cube.width / 2 + data.player.width / 2;
                        } else {
                            data.player.x = cube.x - cube.width / 2 - data.player.width / 2;
                        }
                    } else if (cube.x - cube.width / 2 < data.player.x + data.player.width / 2 && cube.x + cube.width / 2 > data.player.x - data.player.width / 2 && cube.y > data.player.y && data.player.vertVelocity > 0 && data.player.y + data.player.height + data.player.model.border * 2 >= cube.y - cube.height / 2) {
                        data.player.y = cube.y - cube.height / 2 - data.player.height - data.player.model.border * 2;
                        data.player.y = cube.y - cube.height / 2 - data.player.height - data.player.model.border * 2;
                        data.player.vertVelocity = 0;
                        data.player.inAir = true;
                    }
                    if (typeof (cube.animation) == "object") {
                        var n = cube.animation.amplitude * Math.abs(((new Date().getTime() + cube.animation.Toffset * 1000) % (cube.animation.period * 1000) - (cube.animation.period * 500)) / (cube.animation.period * 500)) + cube.animation.Xoffset;
                        if (typeof (cube.animation.upperCap) == "number") {
                            if (n > cube.animation.upperCap)
                                n = cube.animation.upperCap
                        }
                        if (typeof (cube.animation.lowerCap) == "number") {
                            if (n < cube.animation.lowerCap)
                                n = cube.animation.lowerCap
                        }
                        if (cube.animation.type == 'w')
                            cube.width = n;
                        if (cube.animation.type == 'x') {
                            if (cube.x - cube.width / 2 < data.player.x + data.player.width / 2 && cube.x + cube.width / 2 > data.player.x - data.player.width / 2 && data.player.y == cube.y + cube.height / 2)
                                data.player.x += n - cube.x;
                            cube.x = n;
                        }
                    }
                }
            }
            if (data.player.inAir) {
                if (Math.abs(data.player.vertVelocity - data.player.vertDeceleration) <= data.player.vertTerminalVelocity)
                    data.player.vertVelocity -= data.player.vertDeceleration;
            } else {
                data.player.vertVelocity = 0;
            }
            data.scrollX = data.player.x - .5 * canvas.width / scale + config.levelMargin;
            if (data.scrollX < -config.levelMargin)
                data.scrollX = -config.levelMargin;
            if (data.scrollX > config.levelWidth - canvas.width / scale + 2 * config.levelMargin)
                data.scrollX = config.levelWidth - canvas.width / scale + 2 * config.levelMargin;
            data.player.y > 0.6 * canvas.height / scale ? data.scrollY = -(data.player.y - 0.6 * canvas.height / scale) : data.scrollY = 0;
            if (data.player.y < -0.2 * config.levelHeight)
                reset(1);
            if (data.player.y > data.exit.Ymin && data.player.y < data.exit.Ymax && data.player.x > data.exit.Xmin && data.player.x < data.exit.Xmax) {
                data.levelInt++;
                selectLevel(data, pack, data.levelInt % pack.length);
                reset(0);
            }
            for (var i = 0; i < data.checkpoints.length; i++) {
                var c = data.checkpoints[i];
                if (data.player.x > c.x - c.width / 2 && data.player.x < c.x + c.width / 2 && data.player.y >= c.y && data.player.y < c.y + c.height) {
                    c.activated = true;
                    for (var j = i; j >= 0; j--)
                        data.checkpoints[j].activated = true;
                }
            }
            ctx.clearRect(-config.levelMargin, 0.2 * canvas.height / scale, canvas.width / scale, -config.levelHeight / 0.8);
            renderLayers();
            for (var i = 0; i < data.checkpoints.length; i++) {
                var c = data.checkpoints[i];
                (c.activated) ? drawGrad(c.x, c.y + 1, c.height, c.width, "rgba(255,255,255,0.3)", "rgba(20,20,20,0.3)") : drawGrad(c.x, c.y + 1, c.height, c.width, "rgba(20,20,20,0.3)", "rgba(255,255,255,0.3)");
            }
            renderPlayer(data.player);
            renderHUD();
        }
    }, 1000 / config.fps);
}
function reset(n) {
    ctx.clearRect(-config.levelMargin, 0.2 * canvas.height / scale, canvas.width / scale, -config.levelHeight / 0.8);
    data.player = new Player(data.player.model);
    data.scrollX = 0 - config.levelMargin;
    if (n == 1) {
        data.tries++;
        var c;
        for (var i = 0; i < data.checkpoints.length; i++) {
            if (data.checkpoints[data.checkpoints.length - 1 - i].activated) {
                c = data.checkpoints[data.checkpoints.length - 1 - i];
                break;
            }
        }
        if (typeof (c) != "undefined") {
            data.player.x = c.x;
            data.player.y = c.y;
        }
    }
}
function renderLayers() {
    currentLayer = 0;
    for (var i = 0; i < data.layers.length; i++) {
        var layer = data.layers[data.layers.length - i - 1];
        currentLayer = data.layers.length - i - 1;
        for (var j = 0; j < layer.length; j++) {
            var obj = layer[j];
            if (obj.rendertype == "cube")
                drawRect(obj.x, obj.y, obj.height, obj.width, obj.border, obj.color1, obj.color2);
        }
    }
    currentLayer = 0;
}
function renderPlayer(player) {
    if (player.model.type == "cube")
        drawRect(player.x, player.y + player.height / 2 + player.model.border, player.height, player.width, player.model.border, player.model.color1, player.model.color2);
}
function renderHUD() {
    var gradient = ctx.createLinearGradient(0, 0, 200, 20);
    gradient.addColorStop(0, "rgba(0,0,0,0.8)");
    gradient.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = gradient;
    ctx.fillRect(-config.levelMargin, -0.8 * canvas.height / scale, canvas.width / scale, 20);
    ctx.fillStyle = "#cccccc";
    ctx.font = "10pt Courier New";
    ctx.fillText("FPS: " + currentFPS + "  Deaths: " + data.tries + "  Level: " + data.levelname, -config.levelMargin + 15, -0.8 * canvas.height / scale + 15);
}
function drawRect(x, y, height, width, border, color1, color2) {
    ctx.fillStyle = color2;
    ctx.fillRect(x - data.scrollX * ((data.layers.length - currentLayer) / data.layers.length) - width / 2 - border, -y - data.scrollY * ((data.layers.length - currentLayer) / data.layers.length) - height / 2 - border, width + 2 * border, height + 2 * border);
    ctx.fillStyle = color1;
    ctx.fillRect(x - data.scrollX * ((data.layers.length - currentLayer) / data.layers.length) - width / 2, -y - data.scrollY * ((data.layers.length - currentLayer) / data.layers.length) - height / 2, width, height);
}
function drawGrad(x, y, height, width, color1, color2) {
    var gradient = ctx.createLinearGradient(x - data.scrollX - width / 2, -y - data.scrollY, 0, 1000);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(x - data.scrollX - width / 2, -y - data.scrollY, width, -height);
}
function selectLevel(data, pack, n) {
    data.checkpoints = pack[n].checkpoints;
    data.layers = pack[n].layers;
    data.levelname = pack[n].name;
    data.player.vertDeceleration = pack[n].g;
    config.levelHeight = pack[n].h;
    config.levelWidth = pack[n].w;
    data.exit = pack[n].exit;
    data.levelInt = n;
    reset();
    data.player.model.color1 = pack[n].c1;
    data.player.model.color2 = pack[n].c2;
}
function Player(model) {
    this.acceleration = 10;
    this.speed = 0;
    this.terminalVelocity = 200;
    this.vertVelocity = 0;
    this.vertTerminalVelocity = 600;
    this.vertAcceleration = 15;
    this.vertDeceleration = 15;
    this.jumpSpeed = 550;
    this.inAir = false;
    this.x = 100;
    this.y = 0;
    this.height = 50;
    this.width = 50;
    if (typeof (model) == "undefined") {
        this.model = {
            "type": "cube",
            "border": 1,
            "color1": "#20a0a0",
            "color2": "#ffffff"
        }
    } else {
        this.model = model;
    }
}
function Random(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}


```
