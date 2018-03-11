import Sprite from '../Rendering/Sprite.js';

class Stars extends Sprite{
    constructor() {
        super();
    }

    onAdded() {
        
    }

    draw() {
        if (!this._stars) {
            this.stars = [];
            for (var i = 0; i < 500; i++) {
                this.stars[i] = {
                    x: Math.random() * this._w,
                    y: Math.random() * this._h,
                    radius: Math.sqrt(Math.random() * 2),
                    alpha: 1.0,
                    decreasing: true,
                    dRatio: Math.random()*0.05
                };
            }
        }

        this._cache.clear();
        var w = this._w * this._s.x; // scaled width
        var h = this._h * this._s.y; // scaled height
        var drawCtx = this._cache.getDrawingCtx(w, h);
        drawCtx.fillStyle = "#111"
        drawCtx.fillRect(0, 0, w, h);
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            drawCtx.beginPath();
            drawCtx.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
            drawCtx.closePath();
            drawCtx.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
            if (star.decreasing == true) {
                star.alpha -= star.dRatio;
                if (star.alpha < 0.1) { 
                    star.decreasing = false; 
                }
            } else {
                star.alpha += star.dRatio;
                if (star.alpha > 0.95) { 
                    star.decreasing = true; 
                }
            }
            drawCtx.fill();
        }
        drawCtx.restore();
    }


}

export default Stars;