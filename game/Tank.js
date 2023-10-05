class Tank extends GameEngine.Body {
    constructor (originalArgs = {}) {

        const args = Object.assign({
            scale: 3,
            anchorX: 0.5,
            anchorY: 0.5,
        }, originalArgs)
        
        super(Tank.texture, args)
        this.bullets = []

        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision', (a, b) => {
            a.velocity.x = 0
            a.velocity.x = 0
            //console.log(a, b)
        })
    }

    movementUpdate (keyboard) {
        this.velocity.x = 0
        this.velocity.y = 0

        if (keyboard.arrowLeft) {
            this.velocity.x = -Tank.NORMAL_SPEED
        }
       else if (keyboard.arrowRight) {
            this.velocity.x = Tank.NORMAL_SPEED
        }
        else if (keyboard.arrowDown) {
            this.velocity.y = Tank.NORMAL_SPEED
        }
        else if (keyboard.arrowUp) {
            this.velocity.y = -Tank.NORMAL_SPEED
        }

    }
}

Tank.texture = null
Tank.atlas = null

Tank.NORMAL_SPEED = 2
Tank.BULLET_TIMEOUT = 1000
//