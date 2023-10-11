class Topology extends GameEngine.Container {
    constructor (args = {}) {
        super({})

        this.map = args.map || [[]]
        this.size = args.fieldSize || 20

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const field = this.map[y][x]

                if (!field) {
                    continue
                }

                if (field === 'brick') {
                    const body = new GameEngine.Body(Topology.texture, {
                        debug: DEBUG_MODE,
                        x: 0,
                        y: 0,
                        width: this.size / 4,
                        height: this.size / 4
                    } )
                    body.setFramesCollection(Topology.atlas.frames)
                    body.setFrameByKeys('brick', 'type1')

                    this.add(body)
                }
            }
        }
    }
}

Topology.texture = null
Topology.atlas = null