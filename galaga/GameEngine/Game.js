

class Game {
    constructor(stage) {
        this._stage = stage;
        this._gameObjects = [];
        this._updateLoop = null;
    }

    startGameLoop() {
        this.update(0);
    }

    stopGameLoop() {
        if (this._updateLoop) {
            window.cancelAnimationFrame(this._updateLoop);
        }
    }

    add(gameObject) {
        this._gameObjects.push(gameObject);

    }

    update(tFrame) {
        this._updateLoop = window.requestAnimationFrame( this.update.bind(this) );
        this._gameObjects.forEach(
            (gameObject) => { 
                gameObject.update(tFrame); 
            }
        );
        this._stage.render();
    }
}

export default Game;