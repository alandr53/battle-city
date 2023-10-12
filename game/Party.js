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
        loader.addJson('map', 'static/map1.json')
    }
    init() {
        const { loader } = this.parent

       

        Topology.texture = Bullet.texture = Tank.texture = loader.getImage('spriteSheet')
        Topology.atlas = Bullet.atlas = Tank.atlas = loader.getJson('atlas')

        this.arcadePhysics = new GameEngine.ArcadePhysics
        this.topology = new Topology(loader.getJson('map'))
        this.add(this.topology)
        this.arcadePhysics.add(...this.topology.displayObjects)

        this.mainTank = new Tank()
        this.add(this.mainTank)
        this.arcadePhysics.add(this.mainTank) 
    }

    update() {
        const { keyboard } = this.parent
        this.mainTank.movementUpdate(keyboard)
        this.arcadePhysics.processing()
    }
}