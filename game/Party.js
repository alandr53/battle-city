class Party extends GameEngine.Scene {
    constructor (args = {}) {
        super({
            name: 'party',
            ...args
        })

    
    }

    loading (loader) {
        
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/atlas.json')
    }
    init() {
        const { loader } = this.parent

        this.arcadePhysics = new GameEngine.ArcadePhysics

        Tank.texture = loader.getImage('spriteSheet')
        Tank.atlas = loader.getJson('atlas')

        Bullet.texture = loader.getImage('spriteSheet')
        Bullet.atlas = loader.getJson('atlas')

        this.mainTank = new Tank()
        this.add(this.mainTank)
        this.arcadePhysics.add(this.mainTank)
    }

    update() {
        const { keyboard } = this.parent
        this.mainTank.movementUpdate(keyboard)
    }
}