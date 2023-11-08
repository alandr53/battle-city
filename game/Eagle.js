class Eagle extends GameEngine.Body {
    constructor (originalArgs = {}) {

        const args = Object.assign({
            keysDefault: ["eagle", "alive"],
            debug: DEBUG_MODE,
     
        }, originalArgs)

        super(Eagle.texture, args)

        this.toDestroy = false

        this.setFramesCollection(Eagle.atlas.frames)
        this.setAnimationsCollection(Eagle.atlas.actions)

        this.on('collision', a => {
            if (a instanceof Bullet) {
                this.toDestroy = true
               // this.add(this.gameOver) // put Game Over Sprite
               // this.game.startScene('resultScene')
               // this.game.finishScene(this)
            }
        })

/*
        this.on('collision', (a, b) => {
            
            if (a === this.tank) { //collision with itself bullet no destroy
                return
            }
            if (a.isEnimy && b.isEnimy) { //collision between enemys bullet no destroy
                return
            }
            
            this.toDestroy = true
        })*/
    }
    destroy () {
      
      console.log("!!! --- eagle died --- !!!")
      /*  Util.removeElements(this.tank.bullets, this)
        delete this.tank
        const scene = this.scene
        scene.arcadePhysics.remove(this)
        scene.remove(this)*/
    }
}

Eagle.texture = null
Eagle.atlas = null

//