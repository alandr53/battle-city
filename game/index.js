const {Body, Game, Scene, Point, Line, Container} = GameEngine

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

                               this.cola = new Body(colaTexture, {
                                   scale:  0.5,
                                   anchorX: 0.5,
                                   anchorY: 0.5,
                                   x:      this.parent.renderer.canvas.width / 2,
                                   y:      this.parent.renderer.canvas.height / 2,
                                   debug: true,
                                   body: {
                                        x: 0,
                                        y: 0.5,
                                        width: 1,
                                        height: 0.5
                                  }
                               })

                             
                               this.add(this.cola)
                           },

                           update(timestamp) {
                            const {keyboard} = this.parent

                            let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200

                               if (keyboard.arrowUp) {
                                this.cola.rotation += speedRotation
                               }

                               if (keyboard.arrowDown) {
                                this.cola.rotation -= speedRotation
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