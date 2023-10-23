const DEBUG_MODE = true

const {Body, Game, Scene, ArcadePhysics, Util} = GameEngine

mainScene = new Scene({
                           autoStart: true,
                           name: 'mainScene',

 /*                           loading(loader) {
                               loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
                               loader.addJson('atlas', 'static/atlas.json')
                               
                           },
                           init () {
                            Tank.texture = this.parent.loader.getImage('spriteSheet')
                            Tank.atlas = this.parent.loader.getJson('atlas')

                            Bullet.texture = this.parent.loader.getImage('spriteSheet')
                            Bullet.atlas = this.parent.loader.getJson('atlas')

                            this.arcadePhysics = new ArcadePhysics
                            
                            this.tank = new Tank({
                                debug: DEBUG_MODE,
                                x: this.parent.renderer.canvas.width / 2 - 100,
                                y: this.parent.renderer.canvas.height / 2,
                            })

                            this.add(this.tank)
                            this.arcadePhysics.add(this.tank)
                           },

                           update () {
                            const { keyboard } = this.parent
                            
                            this.tank.movementUpdate(keyboard)

                            if (keyboard.space && Util.delay('tank' + this.tank.uid, Tank.BULLET_TIMEOUT)) {
                                const bullet = new Bullet({
                                    debug: DEBUG_MODE,
                                    x: this.tank.x,
                                    y: this.tank.y
                                })
                    
                                this.tank.bullets.push(bullet)
                                bullet.tank = this.tank
                    
                                if (this.tank.animation === 'moveUp') {
                                    bullet.velocity.y -= Bullet.NORMAL_SPEED
                                    bullet.setFrameByKeys('bullet', 'up')
                                }
                                this.add(bullet)
                            }
                            this.arcadePhysics.processing()
                           }
*/
loading(loader) {
    loader.addImage('man', 'static/man.png')
    loader.addJson('manAtlas', 'static/manAtlas.json')
    
},
                          init() {
                               Man.texture = this.parent.loader.getImage('man')
                               Man.atlas = this.parent.loader.getJson('manAtlas')

                                this.arcadePhysics = new ArcadePhysics

                               this.man1 = new Man({            
                                            x: this.parent.renderer.canvas.width / 2 - 100,
                                            y: this.parent.renderer.canvas.height / 2,
                                        })

                                this.man2 = new Man({            
                                            x: this.parent.renderer.canvas.width / 2 + 100,
                                            y: this.parent.renderer.canvas.height / 2,
                                        })


                               this.add(this.man1, this.man2)
                               this.arcadePhysics.add(this.man1, this.man2)
                               
                           },

                           update(timestamp) {
                            const {keyboard} = this.parent

                            this.man1.velocity.x = 0
                            this.man1.velocity.y = 0

                            this.man2.velocity.x = 0
                            this.man2.velocity.y = 0

                               if (keyboard.arrowLeft) {
                                this.man1.velocity.x = -2

                                    if(this.man1.animation !== 'moveLeft') {
                                        this.man1.startAnimation('moveLeft')
                                    }                               
                               }

                               else if (keyboard.arrowDown) {
                                this.man1.velocity.y = +2

                                    if(this.animation !== 'moveDown') {
                                        this.man1.startAnimation('moveDown')
                                    }                              
                               }

                               else if (keyboard.arrowRight) {
                                    this.man1.velocity.x = 2
                               }

                               else if (keyboard.arrowUp) {
                                this.man1.velocity.y = -2
                                }


                               else if (this.man1.animation === 'moveDown') {
                                this.man1.startAnimation('stayDown')
                               }
                               this.arcadePhysics.processing()
                           }
})

   const game = new Game({
       el: document.body,
       width: 500,
       height: 500,
       background: 'gray',
       scenes: [mainScene]
   })

   // https://www.obuka.org/course/webcademy-igra-tanchiki-na-javascript-intensiv/9598-den-415/?p=1


   //https://github.com/alandr53/battle-city