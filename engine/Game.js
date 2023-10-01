;(function(){
    'use strict'

    class Game {
        constructor(args = {}){
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenes = new GameEngine.Container()

            if(args.scenes){
                this.scenes.add(...args.scenes)
            }
           
            if(args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }

            for(const scene of this.scenes.displayObjects) {
                if(scene.autoStart) {
                    scene.loader(this)
                }
            }
        }

        addScene (...scenes) {
            for (const scene of scenes) {
                if(!this.scenes.includes(scene)) {
                    this.scenes.push(scene)
                }
            }
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game
})();