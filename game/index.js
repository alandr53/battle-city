const {Body, Game, Scene, Point, Line, Container, Util} = GameEngine

mainScene = new Scene({
                           autoStart: true,
                           name: 'mainScene',

                           loading(loader) {
                               loader.addImage('man', 'static/man.png')
                               loader.addJson('manAtlas', 'static/manAtlas.json')
                           },
                           init() {
                               const manTexture = this.parent.loader.getImage('man')
                               const manAtlas = this.parent.loader.getJson('manAtlas')
                              console.log(manAtlas)

                               this.man = new Body(manTexture, {
                                scale: 0.5,
                                   anchorX: 0.5,
                                   anchorY: 0.5,
                                   x:      this.parent.renderer.canvas.width / 2,
                                   y:      this.parent.renderer.canvas.height / 2,
                                   //debug: true,
                                   body: {
                                        x: 0,
                                        y: 0.5,
                                        width: 1,
                                        height: 0.5
                                  }
                               })
                               this.man.setFramesCollection(manAtlas.frames)
                               this.man.setAnimationsCollection(manAtlas.actions)
                               //this.man.startAnimation('moveDown')

                           //    this.man.setFrameByKeys('man', 'down', 'frame1')
                            //   this.man.width = this.man.frame.width
                             //  this.man.height = this.man.frame.height

                               this.add(this.man)
                           },

                           update(timestamp) {
                            const {keyboard} = this.parent

                            this.man.velocity.x = 0
                            this.man.velocity.y = 0

                               if (keyboard.arrowUp) {
                                this.man.velocity.y = -5
                               }

                               if (keyboard.arrowDown) {
                                this.man.velocity.y = 5
                               }
                             
                           }
})

   const game = new Game({
       el: document.body,
       width: 500,
       height: 500,
       background: 'white',
       scenes: [mainScene]
   })

   // https://www.obuka.org/course/webcademy-igra-tanchiki-na-javascript-intensiv/9598-den-415/?p=1


   //https://github.com/alandr53/battle-city