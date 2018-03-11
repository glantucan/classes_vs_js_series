class Renderer {

    constructor(){
        this._ctx = null;
        this.__children = [];
    }

    _onChildrenChange(children) {
        this.__children = children;
    }

    setRendererCtx(ctx) {
        this._ctx = ctx;
    }


}
export default Renderer;