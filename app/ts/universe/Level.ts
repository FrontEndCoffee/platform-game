import { Entity } from './Entity'
import { PlatformEntity } from './PlatformEntity'
import { PlayerEntity } from './PlayerEntity'
import { Vector } from '../physics/Vector'
import { IDrawable } from '../graphics/IDrawable'

export class Level {

  private name: string
  private entities: Entity[]
  private player: PlayerEntity

  constructor(levelData: JSON|string, settingsFile: any) {
      let levelContext: Level = this

      this.entities = []
      this.name = levelData['levelName']

      this.player = new PlayerEntity(settingsFile)

      for (let entityIndex in levelData['gameObjects']) {
          if (levelData['gameObjects'][entityIndex] !== undefined) {
              let entity: JSON = levelData['gameObjects'][entityIndex]
              levelContext.entities.push(new PlatformEntity(
                  new Vector(entity[0], entity[1]),
                  new Vector(entity[2], entity[3]),
                  new Vector(entity[4], entity[5]),
                  entity[6]
              ))
          }
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

  public getDrawableEntities(): IDrawable[] {
      let result: IDrawable[] = []
      this.entities.map((entity: any) => {
          if (entity.isDrawable === true) {
              result.push(entity)
          }
      })
      return result
  }
}
