import Sprite from '../Rendering/Sprite.js';

class HeroShip extends Sprite {
    
    constructor (drawOffScreen, offCanvasConf ) {
        super(drawOffScreen, offCanvasConf);
        this._w = 10;
        this._h = 20;
    }

    onAdded() {
        super.onAdded();
    }

    drawOnCache() {
        this._cache.clear();
        // make a 10 frames animation
        var w = this._w * this._s.x; // scaled width
        var h = this._h * this._s.y; // scaled height
        var tempCtx = this._cache.getDrawingCtx(w, h*1.83);
        for (let i = 0; i < 24; i++) {
            tempCtx.save();
            // Body
            tempCtx.beginPath();
            tempCtx.rect(2*w/5, h/2, w/5, h/2);
            tempCtx.fillStyle = 'red';
            tempCtx.fill();
            // front
            tempCtx.arc(w/2, h/2, w/10, 0, Math.PI, true);
            tempCtx.fillStyle = 'red';
            tempCtx.fill();
            tempCtx.closePath();

            // Wings
            tempCtx.beginPath();
            tempCtx.fillStyle = '#ee5500';
            tempCtx.moveTo(2*w/5, 2*h/3);
            tempCtx.lineTo(2*w/10, 2*h/5);
            tempCtx.lineTo(7*w/15, h/20);
            tempCtx.lineTo(8*w/20, 0);
            tempCtx.lineTo(w/50, h/4);
            tempCtx.lineTo(0, h);
            tempCtx.lineTo(2*w/5, h);
            tempCtx.fill();
            tempCtx.closePath();
            // Draw the flame 
            tempCtx.beginPath();
            tempCtx.translate(0, h);
            tempCtx.moveTo(0, 0);
            tempCtx.lineTo(w , 0);
            tempCtx.lineTo(w * 0.5, h * 0.1 + Math.random() * h * 0.5); 
            tempCtx.lineTo(0, 0);
            tempCtx.closePath();
            tempCtx.fillStyle = "orange";
            tempCtx.fill();
        
            tempCtx.restore();
            this._cache.saveFrame(w, h + h * 0.83);
        }
        
    }

    draw(o) {
        this._ctx.save();
        this._cache.drawNextFrame(o);
        this._ctx.restore();
    }

    dispose() {
        super.dispose();
    }
}

export default HeroShip;