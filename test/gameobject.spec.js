var test = require('tape')
var GameObject = require('./temp/GameObject').GameObject
var Vector = require('./temp/Vector').Vector

test('GameObject', assert => {

  assert.deepEqual(
    new GameObject(),
    new GameObject(
      new Vector(0,0),
      new Vector(0,0),
      new Vector(5,5)
    ),
    'should fall back to default values when no arguments are given'
  )


  let movingObject = new GameObject(
    new Vector(1,2),
    new Vector(2,2),
    new Vector(1,1)
  )

  assert.deepEqual(
    movingObject.getPosition(),
    new Vector(1,2),
    'should set private field position'
  )

  assert.deepEqual(
    movingObject.getVelocity(),
    new Vector(2,2),
    'should set private field velocity'
  )

  assert.deepEqual(
    movingObject.getSize(),
    new Vector(1,1),
    'should set private field size'
  )

  assert.equal(movingObject.getColor(), '#f00', 'should have the default color value')

  movingObject.move(2)

  assert.deepEqual(
    movingObject,
    new GameObject(
      new Vector(5,6),
      new Vector(2,2),
      new Vector(1,1)
    ),
    'should move the object according to the given vector'
  )

  movingObject.accelerate( new Vector(1,1) )

  assert.deepEqual(
    movingObject.getVelocity(),
    new Vector(3,3),
    'should accelerate the object with to the given vector'
  )

  // movingObject's position is (5,6)
  movingObject.translate(new Vector(-1,-1))

  assert.deepEqual(
    movingObject.getPosition(),
    new Vector(4,5),
    'should translate object by given vector'
  )

  assert.end()

})
