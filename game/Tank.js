class Tank extends GameEngine.Body {
    constructor (originalArgs = {}) {

        const args = Object.assign({
            scale: 3,
            keysDefault: [ 'gray', 'type1'],
            debug: DEBUG_MODE,
        }, originalArgs)
        
        super(Tank.texture, args)
        this.bullets = []

        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision', a => {
            if (a instanceof Bullet) {
                if(this.bullets.includes(a)) {
                    return
                }
                else {
                    this.visible = false
                    this.scene.arcadePhysics.remove(this)
                }
            }
            this.velocity.x = 0
            this.velocity.y = 0
            //console.log(a, b)
        })
    }

    movementUpdate (keyboard) {
        this.velocity.x = 0
        this.velocity.y = 0

        if (this.animationPaused) {
           this.resumeAnimation() 
        }

        if (keyboard.arrowLeft) {
            this.velocity.x = -Tank.NORMAL_SPEED

            if (this.animation !== 'moveLeft') {
                this.startAnimation('moveLeft')
            }
        }
       else if (keyboard.arrowRight) {
            this.velocity.x = Tank.NORMAL_SPEED
            if (this.animation !== 'moveRight') {
                this.startAnimation('moveRight')
            }
        }
        else if (keyboard.arrowDown) {
            this.velocity.y = Tank.NORMAL_SPEED
            if (this.animation !== 'moveDown') {
                this.startAnimation('moveDown')
            }
        }
        else if (keyboard.arrowUp) {
            this.velocity.y = -Tank.NORMAL_SPEED

            if (this.animation !== 'moveUp') {
                this.startAnimation('moveUp')
            }
        }
        
        else {
            this.pauseAnimation()
        }

        if (keyboard.space && Util.delay('tank' + this.uid, Tank.BULLET_TIMEOUT)) {
            const bullet = new Bullet({
                debug: DEBUG_MODE,
                x: this.centerX,
                y: this.centerY
            })

            this.bullets.push(bullet)
            bullet.tank = this
 
            if (this.animation === 'moveUp') {
                bullet.velocity.y = -Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'up')
            }
            else if (this.animation === 'moveLeft') {
                bullet.velocity.x = -Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'left')
            }
            else if (this.animation === 'moveRight') {
                bullet.velocity.x = Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'right')
            }
            else if (this.animation === 'moveDown') {
                bullet.velocity.y = Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'down')
            }

            this.scene.add(bullet)
            this.scene.arcadePhysics.add(bullet)
        }

    }
}

Tank.texture = null
Tank.atlas = null

Tank.NORMAL_SPEED = 2
Tank.BULLET_TIMEOUT = 250
//