const {Sprite, Game, Scene, Point, Line, Container} = GameEngine

mainScene = new Scene({
                           autoStart: true,
                           name: 'mainScene',

                           loading(loader) {
                               loader.addImage('cola', 'static/cola.jpeg')
                               loader.addJson('persons', 'static/persons.json')
                           },
                           init() {
                               const colaTexture = this.parent.loader.getImage('cola')
                               const graphicContainer = new Container
                               this.sprite = new Sprite(colaTexture, {
                                   scale:  0.25,
                                   anchorX: 0.5,
                                   anchorY: 0.5,
                                   x:      this.parent.renderer.canvas.width / 2,
                                   y:      this.parent.renderer.canvas.height / 2

                               })

                              const point = new Point({
                                    x: this.sprite.x,
                                    y: this.sprite.y,
                               })

                              const line = new Line({
                                    x1: 0, 
                                    y1: 0,
                                    x2: this.parent.renderer.canvas.width,
                                    y2: this.parent.renderer.canvas.height
                               })

                               graphicContainer.add(point, line )
                               this.add(this.sprite)
                               this.add(graphicContainer)
                           },

                           update(timestamp) {
                            const {keyboard} = this.parent

                            let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200

                               if (keyboard.arrowUp) {
                                this.sprite.rotation += speedRotation
                               }

                               if (keyboard.arrowDown) {
                                this.sprite.rotation -= speedRotation
                               }
                             
                           }
})

   const game = new Game({
       el: document.body,
       width: 500,
       height: 500,
       background: 'green',
       scenes: [mainScene]
   })

   // https://www.obuka.org/course/webcademy-igra-tanchiki-na-javascript-intensiv/9598-den-415/?p=1

   // Day-4 || 1:45

   //https://github.com/alandr53/battle-city