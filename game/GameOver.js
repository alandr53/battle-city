class GameOver extends GameEngine.Scene {
    constructor(args = {}) {
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
            const { loader,  renderer: { canvas: {width, height } } } = this.parent

            Topology.texture = Bullet.texture = Tank.texture = loader.getImage('spriteSheet')
            Topology.atlas = Bullet.atlas = Tank.atlas = loader.getJson('atlas')

        }

        update() {}
    }