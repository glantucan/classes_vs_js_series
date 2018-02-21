import Sprite from '../Rendering/Sprite.js';

class Stars extends Sprite{
    constructor() {
        super();
        this.stars = [];
        
    }

    onAdded() {
        for (var i = 0; i < 500; i++) {
            this.stars[i] = {
                x: Math.random() * this._parent.width,
                y: Math.random() * this._parent.height,
                radius: Math.sqrt(Math.random() * 2),
                alpha: 1.0,
                decreasing: true,
                dRatio: Math.random()*0.05
            };
        }
    }

    draw() {
        
        this._ctx.save();
        this._ctx.fillStyle = "#111"
        this._ctx.fillRect(0, 0, this._parent.width, this._parent.width);
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            this._ctx.beginPath();
            this._ctx.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
            this._ctx.closePath();
            this._ctx.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
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
            this._ctx.fill();
        }
        this._ctx.restore();
    }


}

export default Stars;