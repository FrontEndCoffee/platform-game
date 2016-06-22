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

  /**
   * Get the amount of entities that are in the level
   * @return    amount of entities
   */
  public getEntityCount(): number {
      return this.entities.length
  }

  /**
   * Get entity by id
   * @param     id   entity id (key of arraylist)
   * @return         entity
   */
  public getEntity(id: number): Entity {
      if (id >= this.entities.length) {
          throw 'entity with key ' + id + ' does not exist'
      }
      return this.entities[id]
  }

  /**
   * Get the player object
    * @return	player object
   */
  public getPlayer(): PlayerEntity {
    return this.player
  }

  /**
   * Update entity in level
   * @param     id      id of the to be updated entity
   * @param     entity  instance of entity that will replace the old one
   */
  public updateEntity(id: number, entity: Entity): void {
      if (id >= this.entities.length) {
          throw 'entity with key ' + id + ' does not exist'
      }
      this.entities[id] = entity
  }

  /**
   * Add entity to level
   * @param     entity  instance of entity that gets spawned into the level
   */
  public addEntity(entity: Entity): void {
      this.entities.push(entity)
  }

  /**
   * Get a list of all the drawable entities in the level
   * @return    arraylist of drawables
   */
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
