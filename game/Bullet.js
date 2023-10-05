class Bullet extends GameEngine.Body {
    constructor (originalArgs = {}) {

        const args = Object.assign({
            anchorX: 0.5,
            anchorY: 0.5,
        }, originalArgs)
        
        super(Bullet.texture, args)

        this.tank = null

        this.setFramesCollection(Bullet.atlas.frames)
        this.setAnimationsCollection(Bullet.atlas.actions)

        this.on('collision', (a, b) => {
            a.velocity.x = 0
            a.velocity.x = 0
            //console.log(a, b)
        })
    }


}

Bullet.texture = null
Bullet.atlas = null
Bullet.NORMAL_SPEED = 5
//