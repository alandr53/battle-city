const DEBUG_MODE = false

const {Body, Game, Scene, ArcadePhysics, Util, Sprite} = GameEngine


   const game = new Game({
       el: document.body,
       width: 650,
       height: 650,
       background: 'black',
       scenes: [
        new Intro({autoStart: true} ),
        new Party({ autoStart: false}),
        new GameOver({ autoStart: false})
       ]
   })

   // https://www.obuka.org/course/webcademy-igra-tanchiki-na-javascript-intensiv/9598-den-415/?p=1


   //https://github.com/alandr53/battle-city