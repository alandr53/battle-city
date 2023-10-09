const DEBUG_MODE = true

const {Body, Game, Scene, ArcadePhysics, Util, Sprite} = GameEngine

mainScene = new Scene({
                           //autoStart: true,
                           name: 'mainScene',

                           loading(loader) {
                               loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
                               loader.addJson('atlas', 'static/atlas.json')
                               loader.addSound('start','static/sound/stage_start.ogg')
                               
                           },
                           init () {

                            const startSound = this.parent.loader.getSound('start')

                            startSound.play()

                            Tank.texture = this.parent.loader.getImage('spriteSheet')
                            Tank.atlas = this.parent.loader.getJson('atlas')

                            Bullet.texture = this.parent.loader.getImage('spriteSheet')
                            Bullet.atlas = this.parent.loader.getJson('atlas')

                            this.arcadePhysics = new ArcadePhysics
                            
                            this.tank1 = new Tank({
                                debug: DEBUG_MODE,
                                x: this.parent.renderer.canvas.width / 2,
                                y: this.parent.renderer.canvas.height / 2 + 100,
                            })

                            this.tank2 = new Tank({
                                debug: DEBUG_MODE,
                                x: this.parent.renderer.canvas.width / 2,
                                y: this.parent.renderer.canvas.height / 2,
                            })


                            this.add(this.tank1, this.tank2)
                            this.arcadePhysics.add(this.tank1, this.tank2)

                            this.arcadePhysics.add(new Body(null, {
                                static: true,
                                x: -10,
                                y: -10,
                                width: this.parent.renderer.canvas.width + 20,
                                height: 10
                            }))

                            this.arcadePhysics.add(new Body(null, {
                                static: true,
                                x: -10,
                                y: -10,
                                width: 10,
                                height: this.parent.renderer.canvas.height + 20
                            }))
                           },

                           update () {
                            const { keyboard } = this.parent
                            
                            this.tank1.movementUpdate(keyboard)

                            if (keyboard.space && Util.delay('tank' + this.tank1.uid, Tank.BULLET_TIMEOUT)) {
                                const bullet = new Bullet({
                                    debug: DEBUG_MODE,
                                    x: this.tank1.x,
                                    y: this.tank1.y
                                })
                    
                                this.tank1.bullets.push(bullet)
                                bullet.tank = this.tank1
                    
                                if (this.tank1.animation === 'moveUp') {
                                    bullet.velocity.y -= Bullet.NORMAL_SPEED
                                    bullet.setFrameByKeys('bullet', 'up')
                                }
                                this.add(bullet)
                                this.arcadePhysics.add(bullet)
                            }
                            this.arcadePhysics.processing()

                            for (const tank of [this.tank1, this.tank2]) {
                                for (const bullet of tank.bullets) {
                                    if (bullet.toDestroy) {
                                        bullet.destroy()
                                    }
                                }
                            }
                           }

})


const partyScene = new Party ({
    
})

   const game = new Game({
       el: document.body,
       width: 500,
       height: 500,
       background: 'gray',
       scenes: [
        new Intro( )
       ]
   })

   // https://www.obuka.org/course/webcademy-igra-tanchiki-na-javascript-intensiv/9598-den-415/?p=1


   //https://github.com/alandr53/battle-city