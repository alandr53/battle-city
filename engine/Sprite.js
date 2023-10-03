;(function () {
    'use strict'

    class Sprite extends GameEngine.DisplayObject {
        constructor(texture, args = {}){
            super(args)
            const frame = args.frame || { }
            const velocity = args.velocity || { }

            this.texture = texture

            this.velocity = {
                x: velocity.x || 0,
                y: velocity.y || 0
            }

            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture.width,
                height: frame.height || texture.height
            }

            if(args.width === undefined) {
                this.width = this.frame.width
            }

            if(args.height === undefined) {
                this.height = this.frame.height
            }

        }

        tick (timestamp) {
            this.x += this.velocity.x
            this.y += this.velocity.y
        }

        draw (canvas, context) {
            super.draw(() => {
                context.save()
                context.translate(this.x, this.y)
                context.rotate(-this.rotation)
                context.scale(this.scaleX, this.scaleY)
    
                context.drawImage(
                    this.texture,
    
                    this.frame.x,
                    this.frame.y,
                    this.frame.width,
                    this.frame.height,
                    this.absoluteX - this.x,
                    this.absoluteY - this.y,
                    this.width,
                    this.height
                )
                context.beginPath()
                context.fillStyle = 'red'
                context.arc(0, 0, 5, 0, Math.PI * 2)
                context.fill()
    
                context.restore()
            })
        }
    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite
})();


// 9:20 