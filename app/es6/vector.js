const vector = (xValue, yValue) => {

  const x = xValue,
        y = yValue

  return {
    'add': (vector) => vector(

      x + vector.getX(),
      y + vector.getY()

    ),
    'scale': (factor) => vector(

      x * factor,
      y * factor

    ),
    'getX': () => x,
    'getY': () => y
  }

}
