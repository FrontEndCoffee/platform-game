var test = require('tape')
var GameObject = require('./temp/GameObject').GameObject
var Vector = require('./temp/Vector').Vector

test('GameObject', assert => {

  let actual = new GameObject()
  let expected = new GameObject(
    new Vector(0,0),
    new Vector(0,0),
    new Vector(5,5)
  )
  assert.deepEqual(actual, expected, 'should get default values assigned when no arguments are given')

  
  assert.end()
})
