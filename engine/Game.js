;(function(){
    'use strict'

    class Game {
        constructor(args = {}){
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()

            if(args.scenes){
                this.scenesCollection.add(...args.scenes)
            }
           
            if(args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }

            for(const scene of this.scenes) {
                if(scene.autoStart) {
                    scene.loading(this.loader)
                }
            }

            this.loader.load(() => {
                
            })
        }
        get scenes() {
            return this.scenesCollection.displayObjects
        }
               
            }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game
})();