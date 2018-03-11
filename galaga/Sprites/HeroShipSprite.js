import Sprite from '../Rendering/Sprite.js';

class HeroShip extends Sprite {
    
    constructor (drawOffScreen, offCanvasConf ) {
        super(drawOffScreen, offCanvasConf);
        this._w = 10;
        this._h = 10;
    }

    onAdded() {
        super.onAdded();
        
        console.log(this._w, this._h);
    }

    draw() {
        console.log(this._w, this._h);
        this._cache.clear();
        var w = this._w * this._s.x; // scaled width
        var h = this._h * this._s.y; // scaled height
        // make a 10 frames animation
        var tempCtx = this._cache.getDrawingCtx(w, h*1.83);
        for (let i = 0; i < 24; i++) {
            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.rotate(0);
            tempCtx.rect(0, 0, w, h);
            tempCtx.fillStyle = 'red';
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


    dispose() {
        super.dispose();
    }
}

export default HeroShip;