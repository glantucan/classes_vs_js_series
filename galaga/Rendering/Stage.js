import Sprite from './Sprite.js';

class Stage extends Sprite {
    constructor (canvas_id, width, height) {
        super();
        this._canvasEl = document.getElementById('galaga');
        this._ctx = this._canvasEl.getContext("2d");
        this._canvasEl.width = width;
        this._canvasEl.height = height;
    }

    
    get width() {
        return this._canvasEl.width;
    }

    get height() {
        return this._canvasEl.height;
    }

    set width(value) {
        this._canvasEl.width = value;
    }

    set height(value) {
        this._canvasEl.height = value;
    }

    fillWindow (ratio = undefined) {
        var oldWidth = this._canvasEl.width;
        var oldHeight = this._canvasEl.height;
        if (ratio) {
            var vpWidth = window.innerWidth;
            var vpHeight = window.innerHeight;
            var vpRatio = vpWidth / vpHeight;
            if (ratio < vpRatio) {
                this._canvasEl.height = vpHeight;
                this._canvasEl.width = ratio * vpHeight;
            } else {
                this._canvasEl.width = vpWidth;
                this._canvasEl.height = vpWidth / ratio;
            }

        } else {
            this._canvasEl.width = window.innerWidth;
            this._canvasEl.height = window.innerHeight;
        }
        this._s.x = this._canvasEl.width / oldWidth;
        this._s.y = this._canvasEl.height / oldHeight;
    }

    render() {
        this._ctx.clearRect(this._x, this._y, this.width, this.height);
        super.render();
    }
}

export default Stage;