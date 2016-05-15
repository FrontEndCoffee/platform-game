const gameObject = (p, v, s) => {

  let position = p || vector(0, 0),
      velocity = v || vector(0, 0),
      size = s || vector(5, 5),
      color = '#f00'

  return {
    'move': (seconds) => position = position.add(velocity.scale(seconds)),
    'accelerate': (vector) => velocity = velocity.scale(vector),
    'translate': (vector) => position = position.add(vector),
    'setSize': (vector) => size = vector,
    'getSize': () => size,
    'setColor': (string) => color = string,
    'getColor': () => color,
    'getPosition': () => position,
    'getVelocity': () => velocity
  }

}
