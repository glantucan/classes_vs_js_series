//import Stage from './Stage.js';
import CachedCanvas from './CachedCanvas.js';

class Sprite {
    constructor (useCache = false, cacheConf = {
            width: 500,
            height: 150}) {
        
        this._useCache = useCache;
        this._cache = null;

        if (useCache) {
            this._cache = new CachedCanvas(cacheConf.width, cacheConf.height);
        }

        this._w, this._h;
        this._s = {x:1, y:1};
        this._x = 0;
        this._y = 0;
        this._children = [];
        this._parent = null;
        this._dirty = false;
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
        console.log(sprite.scale);
        if (sprite._useCache) {
            sprite._cache.stageContext = this._ctx;
            this.drawOnCache();
        }

        sprite.onAdded();
    }

    removeChild(sprite) {
        var spIdx = this._children.indexOf(sprite);
        this._children.splice(spIdx, 1);
    }

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
     * Abstract method with the off-canvas drawing instructions
     */
    drawOnCache() {}

    /**
     *  Abstract method with the canvas drawing instructions to be implemented
     *  by child classes
     */
    draw(origin) {}

    /**
     *  Abstract method with the initailization to be made when adding to the 
     *  stage, to be implemented by child classes
     */
    onAdded(){}
    

    render() {
        if (this._dirty) {
            this.drawOnCache();
            this._dirty = false;
        }
        this.draw(this._getOrigin());
        this._children.forEach( 
            (child) => { child.render(); } 
        );
    }

    
    _getOrigin() {
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