import Sprite from '../Rendering/Sprite.js';

class ExhaustFlame extends Sprite {
    
    constructor (drawOffScreen, offCanvasConf ) {
        super(drawOffScreen, offCanvasConf);
        this._w = 10;
        this._h = 10;
    }

    onAdded() {
        super.onAdded();
    }

    draw() {
        this._cache.clear();
        var w = this._w * this._s.x; // scaled width
        var h = this._h * this._s.y; // scaled height
        // make a 10 frames animation
        var drawCtx = this._cache.getDrawingCtx(w, h*1.83);
        for (let i = 0; i < 24; i++) {
            // Draw the flame 
            drawCtx.beginPath();
            drawCtx.translate(0, h);
            drawCtx.moveTo(0, 0);
            drawCtx.lineTo(w , 0);
            drawCtx.lineTo(w * 0.5, h * 0.1 + Math.random() * h * 0.5); 
            drawCtx.lineTo(0, 0);
            drawCtx.closePath();
            drawCtx.fillStyle = "orange";
            drawCtx.fill();
        
            drawCtx.restore();
            this._cache.saveFrame(w, h + h * 0.83);
        }
        
    }


    dispose() {
        super.dispose();
    }
}

export default ExhaustFlame;