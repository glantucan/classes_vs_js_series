class Transform {
    constructor(width, height, displayObj) {
        this._w = width;
        this._h = height;
        this._s = {x:1, y:1};
        this._x = 0;
        this._y = 0;
        this.__children;
        this._dO = displayObj;
        this._parent = null;
    }

    _onChildrenChange(children) {
        this.__children = children;
    }

    set parent(val) {
        this._parent = val;
    }

    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
    }
        
    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
    }
    
    get width() {
        return this._w;
    }
    set width(val) {
        var ratio = val / this._w;
        this._w = val;
        this._dO.renderer._dirty = true;
        // Propagate changes to children
        for (let child of this.__children) {
            child._transform.width *= ratio;
            child._transform.x *= ratio;
            child._renderer._dirty = true;
        }
        
    }
    
    get height() {
        return this._h;
    }
    set height(val) {
        var ratio = val / this._h;
        this._h = val;
        this._dO._renderer._dirty = true;
        // Propagate changes to children
        for (let child of this.__children) {
            child._transform.height *= ratio;
            child._transform.y *= ratio;
            child._renderer._dirty = true;
        }
    }

    get scale() {
        return this._s;
    }
    set scale(val) {
        this._s = val;
        this._dO._renderer._dirty = true;
        // Propagate changes to children
        var children = this.__children;
        for (let child of children) {
            child._transform.scale *= val;
            child._renderer._dirty = true;
        }
    }

    get absolutePosition() {
        var absPos;
        // I prefer not to need to do reflection
        //if (!(this instanceof Stage)) {
        if (this.__parent) {
            absPos = {
                x: this._x * this._s.x,
                y: this._y * this._s.y
            }
            if (this.__parent.__parent) {
                var parentAbsPos = this._parent._getOrigin();
                absPos.x += parentAbsPos.x;
                absPos.y += parentAbsPos.y;
            }
        }
        return absPos;
    } 
}

export default Trasnform;