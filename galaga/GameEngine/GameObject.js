
class GameObject {

    constructor(sprite, width, height) {
        this._sprite = sprite;
        this.width = width;
        this.height = height;
        this._v = {x:0, y:0};
    }

    /**
     * Returns the velocity of the game object as {x: number, y: number}
     */
    get v() {
        return this._v;
    }

    /**
     * @param {Object} val - Sets the velocity of the game object. 
     * @param {Object} val.x - x component of the velocity                    {
     * @param {Object} val.y - y component of the velocity                    {
     */
    set v(val) {
        this._v = val;
    }

    get x() {
        return this._sprite.x;
    }

    get y() {
        return this._sprite.y;
    }
    
    set x(val) {
        this._sprite.x = val;
    }

    set y(val) {
        this._sprite.y = val;
    }

    get width() {
        return this._sprite.width;
    }

    get height() {
        return this._sprite.height;
    }
    
    set width(val) {
        this._sprite.width = val;
    }

    set height(val) {
        this._sprite.height = val;
    }
    /**
     * Abstract method that will be called by the Game on every frame
     * @param {number} tFrame 
     */
    update(tFrame) {
        if (this._v.x != 0 || this._v.y != 0) {
            this._sprite.x += this._v.x;
            this._sprite.y += this._v.y; 
        }
    }

}

export default GameObject;