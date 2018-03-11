import Sprite from './../Rendering/Sprite.js';

class ShipSprite extends Sprite {

    constructor (drawOffScreen, offCanvasConf ) {
        super(drawOffScreen, offCanvasConf);
        this._w = 10;
        this._h = 20;
    }

    onAdded() {
        super.onAdded();
    }

    draw() {
        this._cache.clear();
        // make a 10 frames animation
        var w = this._w * this._s.x; // scaled width
        var h = this._h * this._s.y; // scaled height
        var drawCtx = this._cache.getDrawingCtx(w, h);
            drawCtx.save();
            // Body
            drawCtx.beginPath();
            drawCtx.rect(2*w/5, h/2, w/5, h/3);
            drawCtx.fillStyle = '#8e8ad6';
            drawCtx.fill();
            // cockpit
            drawCtx.beginPath();
            drawCtx.moveTo(2*w/5, h/2);
            drawCtx.lineTo(9*w/20, h/4);
            drawCtx.lineTo(11*w/20, h/4);
            drawCtx.lineTo(3*w/5, h/2);
            drawCtx.fillStyle = '#8e8ad6';
            drawCtx.fill();
            drawCtx.closePath();

            drawCtx.beginPath();
            drawCtx.moveTo(17*w/40, h/2);
            drawCtx.lineTo(19*w/40, 11*w/40);
            drawCtx.lineTo(21*w/40, 11*w/40);
            drawCtx.lineTo(23*w/40, h/2);
            drawCtx.lineTo(22*w/40, 23*h/40);
            drawCtx.lineTo(18*w/40, 23*h/40);
            drawCtx.fillStyle = 'black';
            drawCtx.fill();
            drawCtx.closePath();

            // Wings
            drawCtx.beginPath();
            drawCtx.fillStyle = '#5376ea';
            drawCtx.moveTo(2*w/5, h/2);
            drawCtx.lineTo(3*w/10, 2*h/5);
            drawCtx.lineTo(7*w/15, h/20);
            drawCtx.lineTo(2*w/5, 0);
            drawCtx.lineTo(1*w/6, 2*w/7);
            drawCtx.lineTo(1*w/10, 1*w/7);
            drawCtx.lineTo(0, 3*w/7);
            drawCtx.lineTo(w/5, h);
            drawCtx.lineTo(2*w/5, 4*h/5);
            drawCtx.fill();
            drawCtx.closePath();

            drawCtx.beginPath();
            drawCtx.moveTo(3*w/5, h/2);
            drawCtx.lineTo(7*w/10, 2*h/5);
            drawCtx.lineTo(8*w/15, h/20);
            drawCtx.lineTo(3*w/5, 0);
            drawCtx.lineTo(5*w/6, 2*w/7);
            drawCtx.lineTo(9*w/10, 1*w/7);
            drawCtx.lineTo(w, 3*w/7);
            drawCtx.lineTo(4*w/5, h);
            drawCtx.lineTo(3*w/5, 4*h/5);
            drawCtx.fill();
            drawCtx.closePath();
        
            drawCtx.restore();
            this._cache.saveFrame(w, h);
        
    }

    dispose() {
        super.dispose();
    }

}

export default ShipSprite;