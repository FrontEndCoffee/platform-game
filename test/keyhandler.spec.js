'use strict'

let test = require('tape')
let KeyHandler = require('./temp/KeyHandler').KeyHandler

test('KeyHandler', assert => {

    let mockSettings = {
        forwards: 0,
        backwards: 1,
        jump: 2
    }

    let handler = new KeyHandler(mockSettings)

    assert.equal(handler.KEY_FORWARDS, 0, 'forwards constant should equal 0')
    assert.equal(handler.KEY_BACKWARDS, 1, 'backwards constant should equal 1')
    assert.equal(handler.KEY_JUMP, 2, 'jump constant should equal 2')
    
    assert.equal(
        handler.isKeyDown(10), false, 
        'key with keycode 10 should be up')
    handler.onKeyDown(10)
    assert.equal(
        handler.isKeyDown(10), true, 
        'key with keycode 10 should be down')
    handler.onKeyUp(10)
    assert.equal(
        handler.isKeyDown(10), false, 
        'key with keycode 10 should be up')

    assert.end()
})