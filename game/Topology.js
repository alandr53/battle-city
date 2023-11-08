class Topology extends GameEngine.Container {
    constructor (args = {}) {
        super({})

        this.map = args.map || [[]]
        this.size = args.fieldSize || 20

        const [x, y] = this.getCoordinats('eagle', true)
        
 /*       this.eagle_new = new Eagle(Topology.texture, {
            debug: DEBUG_MODE,
            static: true,
            x: x * this.size,
            y: y * this.size
        }) */
       // console.log('x: ' + x,'x: ' + y)
       this.eagle = new Body(Topology.texture, {
            debug: DEBUG_MODE,
            static: true,
            x: x * this.size,
            y: y * this.size
        })

        console.log( this.eagle )
        this.eagle.setFramesCollection(Topology.atlas.frames)
        this.eagle.setFrameByKeys('eagle', 'alive')

        this.eagle.width = this.size
        this.eagle.height = this.size
        this.add(this.eagle)


        this.eagle_new = new Eagle(Topology.texture, {
            debug: DEBUG_MODE,
            static: true,
            x: x * this.size,
            y: y * this.size
        })
        this.eagle_new.width = this.size
        this.eagle_new.height = this.size
        
        console.log( this.eagle_new  )

   
        for (const [x, y] of this.getCoordinats('brick')) {
            for (let dx = 0; dx <= 1; dx++) {
                for (let dy = 0; dy <= 1; dy++) {
                    const body = new GameEngine.Body(Topology.texture, {
                        debug: DEBUG_MODE,
                        static: true,
                        anchorX: dx,
                        anchorY: dy
                    })

                    body.setFramesCollection(Topology.atlas.frames)
                    body.setFrameByKeys('wall', 'brick')

                    body.width = this.size / 2
                    body.height = this.size / 2

                    body.x = x  * this.size + this.size / 2
                    body.y = y  * this.size + this.size / 2

                    body.isBrick = true

                    this.add(body)

                    body.on('collision', a => {
                                    if (a instanceof Bullet) {
                                        this.remove(body)
                                        this.scene.arcadePhysics.remove(body)
                                    }
                                }
                            )
                }
            }
        }

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const field = this.map[y][x]

                if (!field) {
                    continue
                }

                if (field === 'brick') {
                    
                }
            }
        }
    }

    getCoordinats (type, single = false) {
        const results = []

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === type) {
                    if (single) {
                        return [x, y]
                    }
                    results.push([x, y])
                }
            }
        }
        return results 
    }

}

Topology.texture = null
Topology.atlas = null