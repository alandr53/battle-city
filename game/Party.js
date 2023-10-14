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
        loader.addJson('party', 'static/party.json')
    }
    init() {
        const { loader,  renderer: { canvas: {width, height } } } = this.parent

        Topology.texture = Bullet.texture = Tank.texture = loader.getImage('spriteSheet')
        Topology.atlas = Bullet.atlas = Tank.atlas = loader.getJson('atlas')

        this.enimies = new Set

        this.arcadePhysics = new GameEngine.ArcadePhysics


        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: width + 20,
            height: 10
        }))

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: 10,
            height: height + 20
        }))
// --- // 

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: height,
            y: -10,
            width: 10,
            height: height + 20
        }))

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: width,
            width: width + 20,
            height: 10
        }))

        this.topology = new Topology(loader.getJson('map'))
        this.add(this.topology)
        this.arcadePhysics.add(...this.topology.displayObjects)

        const [x, y] = this.topology.getCoordinats('tank1', true)
        this.mainTank = new Tank({
            x: x * this.topology.size,
            y: y * this.topology.size
        })
        this.add(this.mainTank)
        this.arcadePhysics.add(this.mainTank) 

        if(this.topology.eagle) {
            this.topology.eagle.on('collision', a => {
                if (a instanceof Bullet) {
                    this.game.startScene('resultScene')
                    this.game.finishScene(this)
                }
            })
        }

    }

    update() {
        const { keyboard } = this.parent
        this.mainTank.movementUpdate(keyboard)
        this.arcadePhysics.processing()

        for (const object of this.arcadePhysics.objects) {
            if ( object instanceof Bullet && object.toDestroy) {
                object.destroy()
            }
        }
    }
}