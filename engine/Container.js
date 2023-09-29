;(function () {
    'use strict'

class Container {  
    constructor () {
        this.displayObjects = []
    }
    
    add (displayObject) {
        if(!this.displayObjects.includes(displayObject)){
            this.displayObjects.push(displayObject)
        }
    }


    draw (canvas, context) {
        for (const displayObject of this.displayObjects) {
            displayObject.draw(canvas, context)
        }
    }

    remove () {}
}

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container 
})();