import Sprite from './Sprite.js';

class Stage extends Sprite {
    // Define static constants for resizing (sort of static constants :P )
    static get FIT() {
        return 'FIT TO VIEWPORT (Maintain aspect ratio)';
    }
    static get FILL() {
        return 'FILL VIEWPORT (Maintain aspect ratio)';
    }
    static get ADAPT() {
        return 'ADAPT TO VIEWPORT (Don\'t maintain aspect ratio)';
    }
    
    constructor (canvas_id, width, height) {
        super(width, height);
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

    /**
     * Scale the stage (canvas) according to the ratio and scale values.
     * Ratio can be a number or one of this strings: this.FIT, this.SCALE, this.)
     * @param {*} ratio 
     * @param {*} scale 
     */
    scale (ratio = Stage.FIT, scale = 0) {
        var oldWidth = this._canvasEl.width;
        var oldHeight = this._canvasEl.height;
        var oldStRatio = oldWidth/oldHeight;
        var vpWidth = window.innerWidth;
        var vpHeight = window.innerHeight;
        var vpRatio = vpWidth / vpHeight;

        if (typeof ratio === 'string') {
            // Calculate ratio and scale according to the mode
            if (ratio == Stage.FIT) {
                ratio = oldStRatio;
            } else if (ratio == Stage.FILL) {
                ratio = oldStRatio;
                scale = (ratio < 1) ? vpWidth / oldWidth : vpHeight / oldHeight;
            } else if (ratio == Stage.ADAPT) {
                ratio = vpRatio;
            } else {
                console.warn('Unsupported aspect ratio. Assuming FIT mode');
                this.scale();
            }
        } 

        // Resize the canvas according to the scale and ratio values.
        if (typeof ratio === 'number'){
            if (scale) {
                this._canvasEl.width = oldWidth * scale;
                this._canvasEl.height = oldHeight * scale;
            } else {
                if (ratio < vpRatio) {
                    this._canvasEl.height = vpHeight;
                    this._canvasEl.width = ratio * vpHeight;
                    scale = vpHeight / oldHeight;
                } else {
                    this._canvasEl.width = vpWidth;
                    this._canvasEl.height = vpWidth / ratio;
                    scale = vpWidth / oldWidth;
                }
            }
        } else {
            console.warn('Unsupported aspect ratio. Assuming FIT mode');
            this.scale();
        }
        this._s.x = scale;
        this._s.y = scale;
        console.log('Scale ratio:', ratio);
        console.log('stage._s:', this._s);
    }


    render() {
        // As this is the parent of all sprites it's responsible for clearing the canvas on each frame.
        this._ctx.clearRect(this._x, this._y, this.width, this.height);
        super.render();
    }
}

export default Stage;