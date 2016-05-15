const app = () => {

  let engine

  const gameObjects = [],
        keysDown = []

  return {
    'init': () => {

      engine = renderEngine()
      engine.init()

    },
    'onKeyDown': (event) => {

      const key = event.keyCode

      if ( keysDown.find(v => v===key) === undefined ) {
        keysDown.push(key)
      }
      

    },
    'getEngine': () => engine
  }

}

let platformer = app()

window.onload = platformer.init
