const renderEngine = () => {

  let canvas,
      ctx

  const height = window.innerHeight,
        width = window.innerWidth,

        clearFrame = () => {

          ctx.clearRect(0, 0, width, height)

        }

  return {
    'init': () => {

      canvas = document.createElement('canvas')
      canvas.height = height
      canvas.width = width
      ctx = canvas.getContext('2d')
      document.body.appendChild(canvas)

    },
    'draw': (gObject) => {

      ctx.fillStyle = gObject.getColor()
      ctx.fillRect(
        gObject.getPosition().getX(),
        gObject.getPosition().getY(),
        gObject.getSize().getX(),
        gObject.getSize().getY()
      )

    },
    'getHeight': () => height,
    'getWidth': () => width,
    'getContext': () => ctx,
    'getCanvas': () => canvas
  }

}
