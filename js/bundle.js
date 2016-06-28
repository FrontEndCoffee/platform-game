(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Vector_1 = require('../physics/Vector');
var Canvas = (function () {
    function Canvas(context, settings) {
        var displaySettings = settings.getData('display');
        var physicalHeight = context.innerHeight;
        var physicalWidth = context.innerWidth;
        var virtualHeight = displaySettings['height'];
        var scale = virtualHeight / physicalHeight;
        var virtualWidth = physicalWidth * scale;
        this.physicalResolution = new Vector_1.Vector(physicalWidth, physicalHeight);
        this.virtualResolution = new Vector_1.Vector(virtualWidth, virtualHeight);
        this.context = context;
        this.canvasElement = context.document.createElement('canvas');
        this.canvasElement.height = this.physicalResolution.getY();
        this.canvasElement.width = this.physicalResolution.getX();
        window.document.body.appendChild(this.canvasElement);
        this.renderingContext = this.canvasElement.getContext('2d');
        this.renderingContext.scale(1 / scale, 1 / scale);
        this.renderingContext.translate(0, this.virtualResolution.getY());
        this.renderingContext.scale(1, -1);
    }
    /**
     * Wipes the entire canvas
     */
    Canvas.prototype.clearFrame = function () {
        this.renderingContext.clearRect(0, 0, this.virtualResolution.getX(), this.virtualResolution.getY());
    };
    /**
     * Renders a given drawable on the canvas
     * @param   drawable    drawable to be rendered
     */
    Canvas.prototype.draw = function (drawable) {
        drawable.draw(this.renderingContext);
    };
    Canvas.prototype.getVirtualResolution = function () {
        return this.virtualResolution;
    };
    Canvas.prototype.getRenderingContext = function () {
        return this.renderingContext;
    };
    return Canvas;
}());
exports.Canvas = Canvas;

},{"../physics/Vector":8}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Texture_1 = require('./Texture');
var ColorTexture = (function (_super) {
    __extends(ColorTexture, _super);
    function ColorTexture(color) {
        _super.call(this);
        this.color = color;
    }
    /**
     * Generates a fillstyle for this particular type of texture
     * @returns             A fill style to be used elswhere
     */
    ColorTexture.prototype.getFillStyle = function () {
        return this.color;
    };
    return ColorTexture;
}(Texture_1.Texture));
exports.ColorTexture = ColorTexture;

},{"./Texture":3}],3:[function(require,module,exports){
"use strict";
var Texture = (function () {
    function Texture() {
    }
    return Texture;
}());
exports.Texture = Texture;

},{}],4:[function(require,module,exports){
"use strict";
var DataFile_1 = require('./main/DataFile');
var World_1 = require('./universe/World');
var Canvas_1 = require('./graphics/Canvas');
var KeyHandler_1 = require('./main/KeyHandler');
var DebugMonitor_1 = require('./main/DebugMonitor');
var settingsFile = new DataFile_1.DataFile('res/settings.json', function () {
    var levelFile = new DataFile_1.DataFile('res/levelfile.json', function () {
        var world = new World_1.World(levelFile, settingsFile);
        var currentLevel = world.getLevel(0);
        var canvas = new Canvas_1.Canvas(window, settingsFile);
        var keyHandler = new KeyHandler_1.KeyHandler(settingsFile);
        var timestamp = +new Date();
        var debugMonitor = new DebugMonitor_1.DebugMonitor(window);
        debugMonitor.createField('fps');
        debugMonitor.createField('flying');
        setInterval(function (_) { return debugMonitor.renderDebugElement(); }, 200);
        // rendering loop
        var drawFrame = function () {
            // calculate time between frames
            var newTimestamp = +new Date();
            var frameTime = newTimestamp - timestamp;
            timestamp = newTimestamp;
            // debug monitor
            debugMonitor.updateField('fps', Math.round(1000 / frameTime).toString());
            debugMonitor.updateField('flying', currentLevel.getPlayer().isFlying.toString());
            // process user input
            currentLevel.getPlayer().assertInputState(keyHandler);
            // physics will go here
            currentLevel.getPlayer().move(frameTime / 1000);
            // check player collision
            var player = currentLevel.getPlayer();
            var gravity = settingsFile.getData('player')['gravity'];
            var proximateEntityCount = 0;
            currentLevel.getPhysicalEntities().map(function (entity) {
                var entityTop = entity.position.add(entity.size.scale(0.5)).getY();
                var playerBottom = player.position.add(player.size.scale(-0.5)).getY();
                var heightDiff = playerBottom - entityTop;
                var currentVelocity = player.velocity.scale(frameTime / 1000).getY();
                if (player.isTouching(entity) &&
                    heightDiff <= 0 &&
                    heightDiff > currentVelocity) {
                    player.position.setY(entity.position
                        .add(entity.size.scale(0.5))
                        .add(player.size.scale(0.5))
                        .getY());
                    player.velocity.setY(0);
                }
                if (player.isLateralOverlap(entity) && Math.abs(heightDiff) <= gravity) {
                    proximateEntityCount++;
                }
            });
            player.isFlying = proximateEntityCount === 0;
            // clear previous frame
            canvas.clearFrame();
            // draw all drawables in current level
            currentLevel.getDrawableEntities().map(function (drawable) {
                drawable.draw(canvas.getRenderingContext());
            });
            // draw player
            currentLevel.getPlayer().draw(canvas.getRenderingContext());
            window.requestAnimationFrame(drawFrame);
        };
        // link keystroke events to handler
        window.addEventListener('keyup', function (ev) { return keyHandler.onKeyEvent(ev); });
        window.addEventListener('keydown', function (ev) { return keyHandler.onKeyEvent(ev); });
        // start drawing
        drawFrame();
    });
});

},{"./graphics/Canvas":1,"./main/DataFile":5,"./main/DebugMonitor":6,"./main/KeyHandler":7,"./universe/World":13}],5:[function(require,module,exports){
"use strict";
var DataFile = (function () {
    function DataFile(fileURI, callback) {
        var _this = this;
        this.callback = callback;
        var request = new XMLHttpRequest();
        var context = this;
        request.onload = function (event) {
            _this.onDataFileLoad(event.target, context);
        };
        request.open('GET', fileURI, true);
        request.send();
    }
    /**
     * Extract data from the datafile
     * @param   key     key of the JSON object you want to extract
     * @return          JSON object
     */
    DataFile.prototype.getData = function (key) {
        return this.data[key];
    };
    /**
     * event handler for the XMLHttpRequest in the constructor
     * @param	response	the HTTP response object
     * @param 	context     the current datafile instance
     */
    DataFile.prototype.onDataFileLoad = function (response, context) {
        context.data = JSON.parse(response.responseText);
        context.callback();
    };
    return DataFile;
}());
exports.DataFile = DataFile;

},{}],6:[function(require,module,exports){
"use strict";
var DebugMonitor = (function () {
    function DebugMonitor(windowContext) {
        this.windowContext = windowContext;
        var doc = this.windowContext.document;
        var elem = doc.createElement('div');
        elem.id = 'debug_monitor';
        elem.style.position = 'fixed';
        elem.style.top = '0';
        elem.style.left = '0';
        elem.style.fontFamily = 'sans-serif';
        elem.style.zIndex = '2';
        doc.body.appendChild(elem);
        this.keys = [];
        this.values = [];
    }
    /**
     * Update the DOM to show changes
     */
    DebugMonitor.prototype.renderDebugElement = function () {
        var content = '';
        for (var i = 0; i < this.keys.length; i++) {
            content += this.keys[i] + ': ' + this.values[i] + '<br>';
        }
        this.windowContext.document.getElementById('debug_monitor').innerHTML = content;
    };
    /**
     * Create a datafield
     * @param   key   name of the datafield
     */
    DebugMonitor.prototype.createField = function (key) {
        if (this.keys.indexOf(key) !== -1) {
            throw 'Data field with key ' + key + ' already exists';
        }
        else {
            this.keys.push(key);
            this.values.push('null');
        }
    };
    /**
     * Remove a datafield
     * @param   key   name of the datafield
     */
    DebugMonitor.prototype.removeField = function (key) {
        if (this.keys.indexOf(key) === -1) {
            throw 'Data field with key ' + key + ' does not exist';
        }
        else {
            var index = this.keys.indexOf(key);
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    };
    /**
     * Update datafield contents
     * @param   key     name of the to be updated datafield
     * @param   value   new value of the datafield
     */
    DebugMonitor.prototype.updateField = function (key, value) {
        if (this.keys.indexOf(key) === -1) {
            throw 'Data field with key ' + key + ' does not exist';
        }
        else {
            var index = this.keys.indexOf(key);
            this.values[index] = value;
        }
    };
    return DebugMonitor;
}());
exports.DebugMonitor = DebugMonitor;

},{}],7:[function(require,module,exports){
"use strict";
var KeyHandler = (function () {
    function KeyHandler(settings) {
        this.settings = settings.getData('keys');
        this.keysDown = [];
        this.keyForwards = this.settings['forwards'];
        this.keyBackwards = this.settings['backwards'];
        this.keyJump = this.settings['jump'];
    }
    /**
     * Acts according to the given keyboard event type
     * @param event   Event data from keyboard event
     */
    KeyHandler.prototype.onKeyEvent = function (event) {
        var key = event.key;
        var index = this.keysDown.indexOf(key);
        switch (event.type) {
            case 'keyup':
                if (index > -1) {
                    this.keysDown.splice(index, 1);
                }
                break;
            case 'keydown':
                if (index === -1) {
                    this.keysDown.push(key);
                }
                break;
            default:
                throw 'unknown keyevent: ' + event.type;
        }
    };
    /**
     * Returns wheter a key is being held down since the inception of this instance
     * @param   What key to return the hold-down state of
     */
    KeyHandler.prototype.isKeyDown = function (key) {
        return (this.keysDown.indexOf(key) >= 0);
    };
    return KeyHandler;
}());
exports.KeyHandler = KeyHandler;

},{}],8:[function(require,module,exports){
"use strict";
var Vector = (function () {
    function Vector(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }
    /**
     * Returns the sum of the current vector object and the given vector
     * @param v   The vector with which the current vector object is summed up
     * @return    The sum of the current vector object and the given vector
     */
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.getX(), this.y + v.getY());
    };
    /**
     * Returns a new Vector that is the product of the current vector object and the given number
     * @param factor  The number by which the current vector object is multiplied
     * @return        The product of the current vector object and the given factor
     */
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

},{}],9:[function(require,module,exports){
"use strict";
var Entity = (function () {
    function Entity() {
    }
    return Entity;
}());
exports.Entity = Entity;

},{}],10:[function(require,module,exports){
"use strict";
var PlatformEntity_1 = require('./PlatformEntity');
var PlayerEntity_1 = require('./PlayerEntity');
var Vector_1 = require('../physics/Vector');
var Level = (function () {
    function Level(levelData, settingsFile) {
        var levelContext = this;
        this.entities = [];
        this.name = levelData['levelName'];
        this.player = new PlayerEntity_1.PlayerEntity(settingsFile);
        for (var entityIndex in levelData['gameObjects']) {
            if (levelData['gameObjects'][entityIndex] !== undefined) {
                var entity = levelData['gameObjects'][entityIndex];
                levelContext.entities.push(new PlatformEntity_1.PlatformEntity(new Vector_1.Vector(entity[0], entity[1]), new Vector_1.Vector(entity[2], entity[3]), new Vector_1.Vector(entity[4], entity[5]), entity[6]));
            }
        }
    }
    /**
     * Get the amount of entities that are in the level
     * @return    amount of entities
     */
    Level.prototype.getEntityCount = function () {
        return this.entities.length;
    };
    /**
     * Get entity by id
     * @param     id   entity id (key of arraylist)
     * @return         entity
     */
    Level.prototype.getEntity = function (id) {
        if (id >= this.entities.length) {
            throw 'entity with key ' + id + ' does not exist';
        }
        return this.entities[id];
    };
    /**
     * Get the player object
     * @return	player object
     */
    Level.prototype.getPlayer = function () {
        return this.player;
    };
    /**
     * Update entity in level
     * @param     id      id of the to be updated entity
     * @param     entity  instance of entity that will replace the old one
     */
    Level.prototype.updateEntity = function (id, entity) {
        if (id >= this.entities.length) {
            throw 'entity with key ' + id + ' does not exist';
        }
        this.entities[id] = entity;
    };
    /**
     * Add entity to level
     * @param     entity  instance of entity that gets spawned into the level
     */
    Level.prototype.addEntity = function (entity) {
        this.entities.push(entity);
    };
    /**
     * Get a list of all the drawable entities in the level
     * @return    arraylist of drawables
     */
    Level.prototype.getDrawableEntities = function () {
        var result = [];
        this.entities.map(function (entity) {
            if (entity.isDrawable === true) {
                result.push(entity);
            }
        });
        return result;
    };
    Level.prototype.getPhysicalEntities = function () {
        var result = [];
        this.entities.map(function (entity) {
            if (entity.isPhysical === true) {
                result.push(entity);
            }
        });
        return result;
    };
    return Level;
}());
exports.Level = Level;

},{"../physics/Vector":8,"./PlatformEntity":11,"./PlayerEntity":12}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Entity_1 = require('./Entity');
var ColorTexture_1 = require('../graphics/ColorTexture');
var PlatformEntity = (function (_super) {
    __extends(PlatformEntity, _super);
    function PlatformEntity(position, velocity, size, color) {
        _super.call(this);
        this.isDrawable = true;
        this.isPhysical = true;
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.texture = new ColorTexture_1.ColorTexture(color);
    }
    /**
     * Draw a platform onto the screen
     * @param   context     rendering context of the canvas that the platform needs to be
     *                      rendered on.
     */
    PlatformEntity.prototype.draw = function (context) {
        context.fillStyle = this.texture.getFillStyle();
        context.fillRect(this.position.getX() - this.size.getX() / 2, this.position.getY() - this.size.getY() / 2, this.size.getX(), this.size.getY());
    };
    /**
     * calculate physics for the given time period
     * @param   seconds     timeframe over which the physics must be calculated
     */
    PlatformEntity.prototype.move = function (seconds) {
        this.velocity = this.velocity.scale(seconds);
    };
    return PlatformEntity;
}(Entity_1.Entity));
exports.PlatformEntity = PlatformEntity;

},{"../graphics/ColorTexture":2,"./Entity":9}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Entity_1 = require('./Entity');
var Vector_1 = require('../physics/Vector');
var ColorTexture_1 = require('../graphics/ColorTexture');
var PlayerEntity = (function (_super) {
    __extends(PlayerEntity, _super);
    function PlayerEntity(settings) {
        _super.call(this);
        var playerSettings = settings.getData('player');
        this.isFlying = false;
        this.gravity = playerSettings['gravity'];
        this.position = new Vector_1.Vector(playerSettings['position'][0], playerSettings['position'][1]);
        this.velocity = new Vector_1.Vector(playerSettings['velocity'][0], playerSettings['velocity'][1]);
        this.size = new Vector_1.Vector(playerSettings['size'][0], playerSettings['size'][1]);
        this.texture = new ColorTexture_1.ColorTexture(playerSettings['color']);
        this.maxVelocity = new Vector_1.Vector(playerSettings['maxLateralVelocity'], playerSettings['maxAltitudinalVelocity']);
        this.acceleration = new Vector_1.Vector(playerSettings['lateralAcceleration'], playerSettings['altitudinalAcceleration']);
        this.noDirectionalKeysDown = true;
        this.userHasLetGoOfTheJumpKey = true;
    }
    /**
     * Looks at the state of the keyhandler, and according to the state it will execute actions
     * @param   keyHandler  instance of the keyhandler that keystates are read out of
     */
    PlayerEntity.prototype.assertInputState = function (keyHandler) {
        var isForwards = keyHandler.isKeyDown(keyHandler.keyForwards);
        var isBackwards = keyHandler.isKeyDown(keyHandler.keyBackwards);
        var isJump = keyHandler.isKeyDown(keyHandler.keyJump);
        var newVelocity = this.velocity;
        if (isForwards) {
            newVelocity = this.velocity.add(new Vector_1.Vector(this.acceleration.getX(), 0));
            if (newVelocity.getX() > this.maxVelocity.getX()) {
                newVelocity.setX(this.maxVelocity.getX());
            }
        }
        if (isBackwards) {
            newVelocity = this.velocity = this.velocity.add(new Vector_1.Vector(-this.acceleration.getX(), 0));
            if (newVelocity.getX() < -this.maxVelocity.getX()) {
                newVelocity.setX(-this.maxVelocity.getX());
            }
        }
        if (isJump && !this.isFlying && this.userHasLetGoOfTheJumpKey) {
            this.userHasLetGoOfTheJumpKey = false;
            newVelocity = this.velocity.add(new Vector_1.Vector(0, this.acceleration.getY()));
            if (newVelocity.getY() > this.maxVelocity.getY()) {
                newVelocity.setY(this.maxVelocity.getY());
            }
        }
        if (!isForwards && !isBackwards) {
            this.noDirectionalKeysDown = true;
        }
        else {
            this.noDirectionalKeysDown = false;
        }
        if (!isJump) {
            this.userHasLetGoOfTheJumpKey = true;
        }
        this.velocity = newVelocity;
    };
    /**
     * Render the player onto the canvas
     * @param   renderingContext  rendering context of the canvas the player gets rendered on
     */
    PlayerEntity.prototype.draw = function (renderingContext) {
        renderingContext.fillStyle = this.texture.getFillStyle();
        renderingContext.fillRect(this.position.getX() - this.size.getX() / 2, this.position.getY() - this.size.getY() / 2, this.size.getX(), this.size.getY());
    };
    /**
     * calculate physics for the given time period
     * @param   seconds     timeframe over which the physics must be calculated
     */
    PlayerEntity.prototype.move = function (seconds) {
        var resistance = new Vector_1.Vector(this.acceleration.getX(), 0);
        var gravity = new Vector_1.Vector(0, -this.gravity);
        // process basic movement
        this.position = this.position.add(this.velocity.scale(seconds));
        // gravity
        this.velocity = this.velocity.add(gravity);
        // if (this.position.add(this.size.scale(-0.5)).getY() <= 0) {
        //   this.position.setY(this.size.scale(0.5).getY())
        //   this.velocity.setY(0)
        // }
        // code for ground resistance
        if (this.noDirectionalKeysDown) {
            if (this.velocity.getX() > 0) {
                if (this.velocity.getX() < resistance.getX()) {
                    this.velocity.setX(0);
                }
                else {
                    this.velocity.setX(this.velocity.add(resistance.scale(-1)).getX());
                }
            }
            if (this.velocity.getX() < 0) {
                if (this.velocity.getX() > resistance.getX()) {
                    this.velocity.setX(0);
                }
                else {
                    this.velocity.setX(this.velocity.add(resistance.scale(1)).getX());
                }
            }
        }
    };
    PlayerEntity.prototype.getVelocity = function () {
        return this.velocity;
    };
    PlayerEntity.prototype.isTouching = function (entity) {
        return this.isAltidunalOverlap(entity) && this.isLateralOverlap(entity);
    };
    PlayerEntity.prototype.isAltidunalOverlap = function (entity) {
        var entityMaxY = entity.position.add(entity.size.scale(0.5)).getY();
        var entityMinY = entity.position.add(entity.size.scale(-0.5)).getY();
        var playerMaxY = this.position.add(this.size.scale(0.5)).getY();
        var playerMinY = this.position.add(this.size.scale(-0.5)).getY();
        return (((entityMaxY > playerMinY) && (playerMaxY > entityMinY)) ||
            ((entityMinY > playerMinY) && (playerMaxY > entityMinY)));
    };
    PlayerEntity.prototype.isLateralOverlap = function (entity) {
        var entityMaxX = entity.position.add(entity.size.scale(0.5)).getX();
        var entityMinX = entity.position.add(entity.size.scale(-0.5)).getX();
        var playerMaxX = this.position.add(this.size.scale(0.5)).getX();
        var playerMinX = this.position.add(this.size.scale(-0.5)).getX();
        return (((entityMaxX > playerMinX) && (playerMaxX > entityMinX)) ||
            ((entityMinX > playerMinX) && (playerMaxX > entityMinX)));
    };
    return PlayerEntity;
}(Entity_1.Entity));
exports.PlayerEntity = PlayerEntity;

},{"../graphics/ColorTexture":2,"../physics/Vector":8,"./Entity":9}],13:[function(require,module,exports){
"use strict";
var Level_1 = require('./Level');
var World = (function () {
    function World(levelFile, settingsFile) {
        this.levels = [];
        for (var level in levelFile.getData('levels')) {
            if (levelFile.getData('levels')[level] !== undefined) {
                this.levels.push(new Level_1.Level(levelFile.getData('levels')[level], settingsFile));
            }
        }
    }
    /**
     * Get level by ID
     * @param   id      get level by id
     * @return          level instance
     */
    World.prototype.getLevel = function (id) {
        if (this.levels[id] === undefined) {
            throw 'level with id: ' + id + ' does not exist';
        }
        return this.levels[id];
    };
    return World;
}());
exports.World = World;

},{"./Level":10}]},{},[4]);
