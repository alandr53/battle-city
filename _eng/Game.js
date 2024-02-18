
class Game {
        constructor(args = {}){
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()
            this.keyboard = new GameEngine.Keyboard()

            if(args.scenes){
                this.addScene(...args.scenes)
            }
           
            if(args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }

            const autoStartedScenes = this.scenes.filter(x => x.autoStart)

            for(const scene of autoStartedScenes) {
                scene.status = 'loading'
                scene.loading(this.loader)
            }      
                    
            this.loader.load(() => {
                for(const scene of autoStartedScenes) {
                    scene.status = 'init'
                    scene.init()
                }      

                for(const scene of autoStartedScenes) {
                    scene.status = 'started'               
                }      
            })

            requestAnimationFrame(timestamp => this.tick(timestamp)) 
        }

        addScene (...scenes) {
            this.scenesCollection.add(...scenes)

            for (const scene of scenes) {
                scene.parent = this
            }
        }

        get scenes() {
            return this.scenesCollection.displayObjects
        }

        tick (timestamp) {
          const startedScenes = this.scenes.filter(x => x.status === 'started')
          const pausedScenes = this.scenes.filter(x => x.status === 'paused')
          
        for (const scene of pausedScenes) {
                scene.pause()        
            }

        for (const scene of startedScenes) {
                scene.update(timestamp)
                scene.tick(timestamp)
                this.renderer.clear()
                scene.draw(this.renderer.canvas, this.renderer.context)
            }

            requestAnimationFrame(timestamp => this.tick(timestamp)) 
        }

        getScene (name) {
            if (name instanceof GameEngine.Scene) {
                if (this.scenes.includes(name)) {
                    return name
                }

            }  
            if (typeof name === 'string') {
                for (const scene of this.scenes) {
                    if (scene.name === name) {
                        return scene
                    }
                }              
            } 
        }

        startScene (name) {
            const scene = this.getScene(name)
            console.log('start scene: '+ name.name)
            if(!scene) {
                return false
            }

                scene.status = 'loading'
                scene.loading(this.loader)
           
                    
            this.loader.load(() => {              
                    scene.status = 'init'
                    scene.init()
            
                    scene.status = 'started'       
            })
            return true
        }

        finishScene (name) {
            const scene = this.getScene(name)
            console.log('finisch scene: '+ name)
            if(!scene) {
                return false
            }
            scene.status = 'finisched'
            this.scenesCollection.remove(scene)
            scene.beforeDestroy()
           
            
        }
               
            }
