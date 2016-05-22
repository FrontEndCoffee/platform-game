var test = require('tape')
var Vector = require('./temp/Vector').Vector

test('Vector getter', assert => {

  let actual = new Vector(3,5)

  assert.plan(2)
  assert.equal(actual.getX(), 3)
  assert.equal(actual.getY(), 5)

})

test('Vector add', assert => {

  let v1 = new Vector(3,5)
  let v2 = new Vector(4,6)
  let actual = v1.add(v2)
  let expected = new Vector(7,11)

  assert.plan(2)
  assert.equal(actual.getX(), expected.getX())
  assert.equal(actual.getY(), expected.getY())

})

test('Vector scale', assert => {

  let v1 = new Vector(2,3)
  let actual = v1.scale(5)
  let expected = new Vector(10, 15)

  assert.plan(2)
  assert.equal(actual.getX(), expected.getX())
  assert.equal(actual.getX(), expected.getX())
})

test('Vector no-arguments', assert => {

  let actual = new Vector()
  let expected = new Vector(0,0)

  assert.plan(2)
  assert.equal(actual.getX(), expected.getX())
  assert.equal(actual.getY(), expected.getY())
})
