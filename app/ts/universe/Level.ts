import { Entity } from './Entity'
import { PlatformEntity } from './PlatformEntity'
import { Vector } from '../physics/Vector'

export class Level {

    private name: string
    private entities: Entity[]

    constructor(levelData: JSON|string) {
        let levelContext: Level = this

        this.entities = []
        this.name = levelData['levelName']
       
        for(let entityIndex in levelData['gameObjects']) {
            let entity = levelData['gameObjects'][entityIndex]
            levelContext.entities.push(new PlatformEntity(
                new Vector(entity[0], entity[1]),
                new Vector(entity[2], entity[3]),
                new Vector(entity[4], entity[5]),
                entity[6]
            ))
        }
        console.log(this)
    }
}