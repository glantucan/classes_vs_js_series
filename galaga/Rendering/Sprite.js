//import Stage from './Stage.js';
import CachedCanvas from './CachedCanvas.js';

var _DEBUG = false;

class Sprite {
    static set DEBUG(val) {
        _DEBUG = val;
    }

    constructor (width, height) {
        this._w = width;
        this._h = height;
        this._s = {x:1, y:1};
        this._x = 0;
        this._y = 0;
        this._children = [];
        this._parent = null;
        this._dirty = false;
        this._cache = new CachedCanvas(width, height);
        this.draw();
        
    }

    /**
     * Add another sprite as a child of this one
     * @param {Sprite} sprite 
     */
    addChild(sprite) {
        if (sprite._parent) {
            sprite._parent.removeChild(sprite);
        }
        this._children.push(sprite);
        sprite._parent = this;
        sprite._ctx = this._ctx;
        sprite.scale = this._s;
        
        // If this sprite is already on the stage tell its new child's cache which is the stage context. Needed for final rendering (copying from cache to the visible canvas of the stage)
        if (this._ctx) {
            sprite._cache.stageContext = this._ctx;
            sprite.onContextSet();
        }

        sprite.onAddedToSprite();
    }

    onContextSet() {
        this._children.forEach(
            function(child) {
                this._cache.stageContext = this._ctx;
                child.onContextSet();
                child.onAddedToStage();
            }
        );

    }
    /**
     *  Abstract method. Override it if your concrete sprite needs any initialization or
     *  resetting when added to another sprite as a child
     * @param {Sprite} parent The parent sprite this one is being added to. 
     */
    onAddedToSprite(parent) {}

    /**
     *  Abstract method. Override it if your concrete sprite needs any initialization or
     *  resetting when added to another sprite as a child
     */
    onAddedToStage() {}

    /**
     * Remove a sprite from this one's children sprite list, so that it won't be rendered anymore.
     * @param {Sprite} sprite The sprite to be removed from this one sprite list
     */
    removeChild(sprite) {
        var spIdx = this._children.indexOf(sprite);
        this._children.splice(spIdx, 1);
        sprite.onRemoved(this);
    }

    /**
     *  Abstract method. Override it if your concrete sprite needs any initialization or
     *  resetting when added to another sprite as a child
     * @param {Sprite} parent  The parent sprite this one is being removed from. 
     */
    onRemoved(parent) {}

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    
    set x(val) {
        this._x = val;
    }

    set y(val) {
        this._y = val;
    }

    get width() {
        return this._w;
    }

    get height() {
        return this._h;
    }
    
    set width(val) {
        var ratio = val / this._w;
        this._w = val;
        this._dirty = true;
        this._children.forEach(
            function(child) {
                child.width *= ratio;
                child.x *= ratio;
                child._dirty = true;
            }
        );
    }

    set height(val) {
        var ratio = val / this._h;
        this._h = val;
        this._dirty = true;
        this._children.forEach(
            function(child) {
                child.height *= ratio;
                child.y *= ratio;
                child._dirty = true;
            }
        );
    }

    get scale() {
        return this._s;
    }
    set scale(val) {
        this._s = val;
        this._dirty = true;
        this._children.forEach(
            function(child) {
                child.scale *= val;
                child._dirty = true;
            }
        );
    }

    /**
     *  Abstract method with the canvas drawing instructions to be implemented
     *  by child classes
     */
    draw() {}

    drawFromCache(origin) {
        this._ctx.save();
        this._cache.drawNextFrame(origin);
        this._ctx.restore();
    }

   
    
    /** 
     * Renders the sprite contents to the canvas. It also calls render on each sprite
     * children if it has any.
     */
    render() {
        if (this._dirty) {
            this.draw();
            this._dirty = false;
        }
        // Even if it uses cache, child sprites are rendered on their own. 
        // TODO: Consider caching also the children if needed for performance.
        this._children.forEach( 
            (child) => { child.render(); } 
        );

        if (_DEBUG) {
            //this._ctx.save();
            this._ctx.lineWidth = 1;
            this._ctx.strokeStyle = "blue";
            this._ctx.strokeRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
            
            //this._ctx.restore();
        }
    }

    /** 
     * Get top left corner position of this sprite accounting for ancestors position and scaling.
     */
    getOrigin() {
        var absPos;
        // I prefer not to need to do reflection
        //if (!(this instanceof Stage)) {
        if (this._parent) {
            absPos = {
                x: this._x * this._s.x,
                y: this._y * this._s.y
            }
            //if (!(this._parent instanceof Stage)) { 
            if (this._parent._parent) {
                var parentAbsPos = this._parent._getOrigin();
                absPos.x += parentAbsPos.x;
                absPos.y += parentAbsPos.y;
            }
        }
        return absPos;
    }

    dispose() {

    }

}

export default Sprite;