'use strict'

let test = require('tape')
let GameObject = require('./temp/GameObject').GameObject
let Vector = require('./temp/Vector').Vector
let PhysicsEngine = require('./temp/PhysicsEngine').PhysicsEngine


test('PhysicsEngine', assert => {

    let mockA = genStatMock(0,0)

    assert.equal(
        PhysicsEngine.isHit(mockA, genStatMock(5,5)),
        true,
        'should detect object A and B hitting'
    )

    assert.equal(
        PhysicsEngine.isHit(mockA, genStatMock(-5,5)),
        true,
        'should detect object A and B hitting'
    )
    
    assert.equal(
        PhysicsEngine.isHit(mockA, genStatMock(5,-5)),
        true,
        'should detect object A and B hitting'
    )
    
    assert.equal(
        PhysicsEngine.isHit(mockA, genStatMock(-5,-5)),
        true,
        'should detect object A and B hitting'
    )

    assert.equal(
        PhysicsEngine.isHit(mockA, genStatMock(12,0)),
        false,
        'should detect object A and B not hitting'
    )

    let mockArrayA = [
        new GameObject(new Vector(0,0), new Vector(10,0), new Vector(10,10)),
        new GameObject(new Vector(0,0), new Vector(0,10), new Vector(10,10)),
    ]
    let mockArrayB = [
        new GameObject(new Vector(5,0), new Vector(10,0), new Vector(10,10)),
        new GameObject(new Vector(0,5), new Vector(0,10), new Vector(10,10)),
    ]
    PhysicsEngine.update(mockArrayA, 500)

    assert.deepEqual(
        mockArrayA,
        mockArrayB,
        'should calculate the movement of the gameobjects over 0.5s'
    )    

    assert.end()
})


/**
 * Generate a stationary mocking GameObject
 * @return  A mock GameObject
 */
let genStatMock = (x, y) => {
    return new GameObject(
        new Vector(x, y),
        new Vector(0,0),
        new Vector(10,10)
    )
}