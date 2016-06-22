import { Entity } from './Entity'
import { Vector } from '../physics/Vector'
import { ColorTexture } from '../graphics/ColorTexture'
import { Texture } from '../graphics/Texture'
import { KeyHandler } from '../main/KeyHandler'
import { IPlayerEntity } from './IPlayerEntity'

export class PlayerEntity extends Entity implements IPlayerEntity {

  public position: Vector
  public velocity: Vector
  public size: Vector
  public texture: Texture

  constructor(settings: any) {
    super()
    let playerSettings: JSON = settings.getData('player')
    this.position = new Vector(playerSettings['position'][0], playerSettings['position'][1])
    this.velocity = new Vector(playerSettings['velocity'][0], playerSettings['velocity'][1])
    this.size = new Vector(playerSettings['size'][0], playerSettings['size'][1])
    this.texture = new ColorTexture(playerSettings['color'])
  }

  public assertInputState(keyHandler: KeyHandler): void {
    console.log('TODO implement code')
  }

  public draw(renderingContext: CanvasRenderingContext2D): void {
    console.log('TODO implement code')
  }

  public move(seconds: number): void {
    console.log('TODO implement code')
  }
}
