function create() {
    return {
        //TODO: Think about who should set behaviors over time. Here I'm sayin it's the role, but could it be the context?
        taunt(target, thresholdDistance) {
            target.subscribe( () => {
                if (Math.abs(this.x - target.position.x) < thresholdDistance) {
                    this.shootPrimary();
                }
            });
        },
        suicideRun(target) {
            target.subscribe( () => {
                // Calculate distance to target
                var distX = target.position.x - this.position.x;
                var distY = target.position.xy - this.position.y;
                var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
                // generate a normalized direction
                direction = {
                    x: distX/distance,
                    y: distY/distance
                }
                // Set maximum velocity against the target.
                this.velocity = {
                    x: this.maxSpeed * direction.x,
                    y: this.maxSpeed * direction.y
                };
            });
        },
        dispose() {
            //TODO: unsubscribe listeners
        }
    }
}


export {create}