import { GameObject } from '../GameObject'
import { Vector } from '../Vector'
import { KeyHandler } from '../KeyHandler'

export class Player extends GameObject {

  private settings: any

  constructor(settings) {
    super(
      new Vector(settings.position[0], settings.position[1]),
      new Vector(settings.velocity[0], settings.velocity[1]),
      new Vector(settings.size[0], settings.size[1]),
      settings.color
    )
  }

  public update(keyHandler: KeyHandler, time: number) {
    this.move(time)
    let isFwrd = keyHandler.isKeyUp(keyHandler.KEY_FORWARDS)
    let isBwrd = keyHandler.isKeyUp(keyHandler.KEY_BACKWARDS)
    let isJump = keyHandler.isKeyUp(keyHandler.KEY_JUMP)
    
  }
}
