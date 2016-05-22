var test = require('tape')
var GameObject = require('./temp/GameObject').GameObject
var Vector = require('./temp/Vector').Vector

test('GameObject construct', assert => {

  let actual = new GameObject()
  let expected = new GameObject(
    new Vector(0,0),
    new Vector(0,0),
    new Vector(5,5)
  )

  assert.equal(actual, expected)
})
