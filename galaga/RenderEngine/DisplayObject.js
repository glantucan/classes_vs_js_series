import Container from './Display/Container.js';

/**
 * It deals with display objects components to provide all of its functionality.
 */

class DisplayObject {
    constructor (width, height) {
        this._transform = new Transform(width, height);
        this._renderer = this.createRenderer(); // Left to be created by Sprite implementations
        this._container = null;
        this._parent = null;
        this.__children = [];
        this.init(); // call to subclasses implementation
    }

    _onChildrenChange(children) {
        this.__children = children;
    }

    addChild(displayObj) {
        if (!this._container) {
            this._container = new Container();
            this._container.subscribe(
                this._onChildrenChange.bind(this), 
                this._transform._onChildrenChange.bind(this._transform), 
                this.renderer._onChildrenChange(this._renderer)
            );
        }
        this._container = this._container || new Container();
        this._container.addChild(displayObj);
        displayObj.__added(this);
    }

    removeChild(displayObj) {
        if (this._container) {
            var couldRemove = this._container.removeChild(displayObj);
            if (couldRemove) {
                displayObj.__removed();
            }
        }
    }

    
    set renderer(val) {
        this._renderer = val;
    }

    
    dispose() {
        // TODO: Derreference everithing so it can be garbage collected
    }


    //
    //  Abstract and virtual methods
    // ***************************************************************************************

    /** 
     * Abstract method to be implemented on subclasses. Implemetation must 
     * create an instance of a concrete rendererer and provide any spscific instance methods 
     * needed by that renderer
     * For example:
     *      init() {
     *          this._renderer = new CachedShape();
     *          renderer.draw =  function () {
     *              this.drawingCtx.beginPath();
     *              this.drawingCtx.rotate(0);
     *              this.drawingCtx.rect(0, 0, w, h);
     *              this.drawingCtx.fillStyle = 'red';
     *              this.drawingCtx.fill();
     *              this.drawingCtx.closePath();
     *          }
     *          return renderer;
     *      }
    */
    init() {
        throw Error('This method must be implemented by any subclass!!!');
    }
    
    /**
     * Virtual empty method that can be optionally implemented by subclasses
     */
    onAddedToStage(){}
    
    /**
     * Virtual empty method that can be optionally implemented by subclasses
     */
    onAdded(parent){}
    
    /**
     * Virtual empty method that can be optionally implemented by subclasses
     */
    onRemoved(){}
    

    //
    //  Private methods
    // ***************************************************************************************

    /*
    Should this be done inside the container class??
       No. It seems fair to let it be here, Container will depend on DisplayObject anyway and this is a template method that invokes abastract methods that should be implemented by subclasses of DisplayObject.
       Besides, dealing with the container and the renderer components is a responsability of this class. Containers should not know about the renderers or viceversa.
    */
    /**
     * This method will be called by the Container component of a parent when this display 
     * object is added to it. It'll be responsible for setting the parent relationship and 
     * the renderer drawing context  and propagating them to all displayObj childrens (set on
     * this instance's container)
     * @param {DisplayObject|Stage} displayObj _Parent display object or stage  
     */
    __added(parent) {
        if (parent._renderer._ctx) {
            this._renderer.setRendererCtx(parent._renderer._ctx);
            this.onAddedToStage();
            for (let child of this.__children) {
                child.__added(this);
            }
        }
        if (!this._parent) { // To avoid calling this.onAdded() again when any of this display object ancestors is added to another display object (remember this function is called on all childrens recursively)
            this.onAdded(parent);
        }
        this._parent = parent;
        this._transform.parent = parent;
    }

     /**
     * This will be called by the Container component of the parent when removing this 
     * instance from it and be responsible for unsetting the parent relationship and the 
     * drawing context of the application to all sprite container childrens among doing so on
     * itself
     */
    __removed() {
        this._renderer.setRendererCtx(null);
        for (let child of this.__children) {
            child.__removed();
        }
        this.onRemoved();
        this._parent = null;
        this._transform.parent = null;
    }

}

export default Sprite;