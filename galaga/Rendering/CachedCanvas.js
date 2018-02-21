/** 
 * Creates a canvas to store cached images as frames that can be recovered later.
 * It actually creates and aditional temp canvas for drawing and frames are copied from it 
 * to the actual cache canvas when the saveFrame method is invoked.
 */
class CachedCanvas {

    constructor(width = 600, height = 300) {
        // the canvas we draw in
        this._tempCanvas = document.createElement('canvas');
        this._tempCtx = this._tempCanvas.getContext('2d');
        this._tempCanvas.width = width;
        this._tempCanvas.height = height;
        // The canvas where each frame is copied to for future use
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        this._canvas.width = width;
        this._canvas.height = height;
        this._margin = 3; // Margin left between frames

        document.querySelector('body').appendChild(this._canvas);



        this._currentFrame = 0;
        this._frames = [];
        // The ctx the frames will be drawn to when asking for a frame
        this._stageCtx = null;
        this._lastWidth = 0;
    }

    /**
     * Set the canvas context to copy frames to when rendering.
     */
    set stageContext(val) {
        this._stageCtx = val;
    }

    /**
     * Get the temp drawing canvas context. You can draw whatever you want here and then call saveFrame to save the drawing to a frame in the cache. 
     */
    getDrawingCtx(width = this._tempCanvas.width, height = this._tempCanvas.height) {
        if (width != this._tempCanvas.width || height != this._tempCanvas.height) {
            this._tempCanvas.width = width;
            this._tempCanvas.height = height;
        }
        return this._tempCtx;
    }

    /** 
     * Get the number of frames stored. You'll probable need it for looping the animations
     */
    get framesCount() {
        return this._frames.length;
    }


    /**
     * Draws the current frame in the destination position
     * @param {*} destination 
     */
    drawNextFrame (destination) {
        this.drawFrame(this._currentFrame, destination);
        this._currentFrame += 1;
        if (this._currentFrame == this._frames.length) {
            this._currentFrame = 0;
        }
    }

    /**
     * Draws the specified frame in the destination position
     * @param {*} idx 
     * @param {*} destination 
     */
    drawFrame(idx, destination) {
        var frame = this._frames[idx];
        this._stageCtx.drawImage( 
            this._canvas, frame.x, frame.y, frame.width, frame.height, 
            destination.x, destination.y, frame.width, frame.height);
    }

    /**
     * Saves what's drawn on the temp canvas as a frame on the chache. 
     * Returns the index on the frames array, in case you are using the same instance 
     * for all the animations and want to store frame ids of the same animation separately.
     * @param {number} width 
     * @param {number} height 
     * @returns {number} frame index.
     */
    saveFrame(width, height) {
        var newWidth = Math.round(this._lastWidth + width + this._margin);

        // Resize the canvas if we get short on space
        if (newWidth > this._canvas.width || height > this._canvas.height) {
            var ctxImgData = this._ctx.getImageData(
                0, 0, this._canvas.width, this._canvas.height);
            this._canvas.width = newWidth;
            this._canvas.height = height;
            this._ctx.putImageData(ctxImgData, 0, 0);
        }

        this._ctx.drawImage(this._tempCanvas, this._lastWidth, 0);
        this._tempCtx.clearRect(0,0, this._tempCanvas.width, this._tempCanvas.height);
        
        this._frames.push({
            x: this._lastWidth,
            y: 0,
            width: width,
            height: height
        });
        this._lastWidth = newWidth;

        return this._frames.length - 1; // return the frame index
    }

    clear() {
        this._ctx.clearRect(0,0, this._canvas.width, this._canvas.height);
    }
}

export default CachedCanvas;