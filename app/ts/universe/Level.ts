import { Entity } from './Entity'
import { PlatformEntity } from './PlatformEntity'
import { Vector } from '../physics/Vector'
import { Drawable } from '../graphics/Drawable'

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
    }

    public getEntityCount(): number {
        return this.entities.length
    }

    public getEntity(id: number): Entity {
        if (id >= this.entities.length) {
            throw 'entity with key ' + id + ' does not exist' 
        }
        return this.entities[id]
    }

    public updateEntity(id: number, entity: Entity): void {
        if (id >= this.entities.length) {
            throw 'entity with key ' + id + ' does not exist' 
        }
        this.entities[id] = entity
    }

    public addEntity(entity: Entity): void {
        this.entities.push(entity)
    }

    public getDrawableEntities(): Drawable[] {
        let result: Drawable[] = []
        this.entities.map((entity: any) => {
            if (entity.isDrawable === true) {
                result.push(entity)
            }
        })
        return result
    }
}