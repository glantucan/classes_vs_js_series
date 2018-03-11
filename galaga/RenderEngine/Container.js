class Container {

    constructor(displayObj) {
        this._children = [];
        this._subscribers = [];
    }
    
    get children() {
        return this._children;
    }

    get hasChildren() {
        return Boolean(this._children.length);
    }

    /**
     * Adds a display object from the children
     * @param {DisplayObject} displayObj 
     */
    addChild(displayObj) {
        this._children.push(displayObj);
        __onChange();
    }

    /**
     * Removes a display object from the children
     * @param {Boolean} displayObj 
     */
    removeChild(displayObj) {
        var idx = this._children.indexOf(displayObj);
        if (idx) {
            this._children.splice(idx, 1);
            displayObj._removed();
            __onChange();
        }
        return Boolean(idx);
    }

    /**
     * Subscribe a function to changes on the children list
     * @param {Function} callback 
     */
    _subscribe(...callbacks) {
        for (let callback of callbacks) {
            this._subscribers.push(callback);
        }
    }
    /**
     * Unsubscribe a function to changes on the children list
     * @param {...Function} callbacks The functions to unsubscribe  
     */
    _unsubscribe(...callbacks) {
        for (let callback of callbacks) {
            this._subscribers.splice(this._subscribers.indexOf(callback));
        }
    }

    /** 
     * Pass the children array to the subscribers
    */
    __onChange() {
        for (let subscriber of this._subscriber) {
            this.subscriber(this._children);
        }
    }
}

export default Container;