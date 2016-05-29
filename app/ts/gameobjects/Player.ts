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
    this.settings = settings
  }

  public update(keyHandler: KeyHandler, time: number) {
    let isFwrd = keyHandler.isKeyUp(keyHandler.KEY_FORWARDS)
    let isBwrd = keyHandler.isKeyUp(keyHandler.KEY_BACKWARDS)
    let isJump = keyHandler.isKeyUp(keyHandler.KEY_JUMP)

    if (isFwrd) {
      this.accelerate(new Vector(this.settings.lateralAcceleration, 0))
    }
    if (isBwrd) {
      this.accelerate(new Vector(-this.settings.lateralAcceleration, 0))
    }

    this.move(time/1000)
  }

  public accelerate(dVel: Vector): void {
    this.velocity = this.velocity.add(dVel)
    if (Math.abs(this.velocity.getX()) > this.settings.maxLateralVelocity) {
      let plusMinus = Math.abs(this.velocity.getX()) / this.velocity.getX()
      this.velocity.setX(this.settings.maxLateralVelocity * plusMinus)
    }
    if (Math.abs(this.velocity.getY()) > this.settings.maxAltitudinalVelocity) {
      let factor = Math.abs(this.velocity.getY()) / this.settings.maxAltitudinalVelocity
      this.velocity.setY(this.velocity.getY() / factor)
    }

  }
}
