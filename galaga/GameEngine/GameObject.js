
class GameObject {

    constructor(sprite) {
        this._sprite = sprite;
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

    // These should return the size of the bounding-box
    get width() {
        return this._sprite.width;
    }
    get height() {
        return this._sprite.height;
    }
    
    get sprite () {
        return this._sprite;
    }
    set sprite(val) {
        this._sprite = val;
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