'use strict'

let test = require('tape')
let KeyHandler = require('./temp/main/KeyHandler').KeyHandler

test('KeyHandler', assert => {

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