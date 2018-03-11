class GameObject {

    constructor () {
        // Transform propeties
        this.__name;
        this.__position = {
            x: 0,
            y: 0
        };
        this.__maxSpeed = 5;
        this.__velocity = {
            x: 0,
            y: 0
        }
        this.__accel = {
            x: 0,
            y: 0
        }
        this.__size = {
            width: 0,
            height: 0
        };
        this.__scale = 1; 

        // Game propeties
        this.__health = 0;
        this.__currentHealth = 0;
        this.__damage = 0;
        
        // Hierarchy properties
        this.__parent = null;
        this.__children = [];
        
    }

    get position() {
        return {
            x: this.__position.x + 0.5 * this.size.width,
            y: this.__position.y + 0.5 * this.size.height 
        };
    }
    set position(val) {
        this.__position = {
            x: val.x + 0.5 * this.size.width,
            y: val.y + 0.5 * this.size.height
        };
    }

    get maxSpeed() {
        return this.__maxSpeed;
    }
    set maxSpeed(val) {
         this.__maxSpeed = val;
    }

    get velocity() {
        return {
            x: this.__velocity.x,
            y: this.__velocity.y 
        };
    }
    set __velocity(val) {
        this.__velocity = {
            x: val.x,
            y: val.y
        };
    }

    get accel() {
        return {
            x: this.__accel.x,
            y: this.__accel.y 
        };
    }
    set accel(val) {
        this.__accel = {
            x: val.x,
            y: val.y
        };
    }

    get size() {
        return this.__size * this.__scale;
    }
    set size(val) {
        this.__size = val / this.__scale;
    }

    get health() {
        return this.__health;
    }
    set health(val) {
         this.__health = val;
    }

    get currentHealth() {
        return this.__currentHealth;
    }
    set currentHealth(val) {
         this.__currentHealth = val;
    }
    
    get damage() {
        return this.__damage;
    }
    set damage(val) {
        this.__damage = val;
    }

    get boundaries(){
        return {
            left: this.__position.x,
            top: this.__position.y,
            right: this.__position.x + this.__size.width,
            bottom: this.__position.y + this.__size.height
        }
    }

    get scale() {
        return this.__scale;
    }
    set scale(val) {
        this.__scale = val;
    }

    // TO FIX: This should probable go in a role.
    addChild(gameObject) {
        this.__children.push(gameObject);
        gameObject.__parent = this;
    }
    removeChild(gameObject) {
        var child = this.__children.splice(this.__children.indexOf(gameObject), 1);
        child.__parent = null;
    }
    
    get parent() {
        return this.__parent;
    }
    
}

export default GameObject