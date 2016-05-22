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
    )
    'should fall back to default values when no arguments are given'
  )

  assert.end()
  
})
