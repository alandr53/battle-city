class GameOver extends GameEngine.Body {
    constructor (originalArgs = {}) {

        const args = Object.assign({
            scale: 5,
            anchorX: 0.5,
            anchorY: 0.5,
            debug: DEBUG_MODE,
            body: {
                 x: 0,
                 y: 0.5,
                 width: 1,
                 height: 0.5
            }
        }, originalArgs)
        
        super(GameOver.texture, args)

        this.setFramesCollection(GameOver.atlas.frames)
        this.setAnimationsCollection(GameOver.atlas.actions)
        this.startAnimation('gameOver')

    }
}

GameOver.texture = null
GameOver.atlas = null
//