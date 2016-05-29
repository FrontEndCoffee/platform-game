'use strict'

var test = require('tape')
var Vector = require('./temp/Vector').Vector

test('Vector', assert => {

  assert.deepEqual(
    new Vector(),
    new Vector(0, 0),
    'should default to (0,0) when no arguments are given'
  )

  assert.deepEqual(
    new Vector(3,5).add( new Vector(4,6) ),
    new Vector(7,11),
    'should sum up the given vectors'
  )

  assert.deepEqual(
    new Vector(2,3).scale(5),
    new Vector(10,15),
    'should scale both x and y with the given factor'
  )

  assert.end()
})
