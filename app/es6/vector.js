const vector = (xValue, yValue) => {

  const x = xValue,
        y = yValue

  return {
    'add': (vector2) => vector(

      x + vector2.getX(),
      y + vector2.getY()

    ),
    'scale': (factor) => vector(

      x * factor,
      y * factor

    ),
    'getX': () => x,
    'getY': () => y
  }

}
