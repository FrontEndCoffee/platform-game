const app = () => {

  let gameObjects = [],
      keysDown = [5],
      engine

  return {
    'init': () => {

      engine = renderEngine()
      engine.init()

    },
    'onKeyDown': (event) => {

      let key = event.keyCode

      if ( keysDown.find(v => v===key) === undefined ) {
        keysDown.push(key)
      }

    }
  }

}

let platformer = app()

window.onload = platformer.init
