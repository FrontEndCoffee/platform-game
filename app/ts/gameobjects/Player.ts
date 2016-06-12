import { GameObject } from '../GameObject'
import { Vector } from '../Vector'
import { KeyHandler } from '../KeyHandler'

export class Player extends GameObject {

  private settings: any
  private keyHandler: KeyHandler
  private gameObjects: GameObject[]

  constructor(keyHandler: KeyHandler, gameObjects: GameObject[], settings: any) {
    super(
      new Vector(settings.position[0], settings.position[1]),
      new Vector(settings.velocity[0], settings.velocity[1]),
      new Vector(settings.size[0], settings.size[1]),
      settings.color
    )
    this.settings = settings
    this.keyHandler = keyHandler
    this.gameObjects = gameObjects
  }

  public update(time: number): void {
    let isFwrd: boolean = this.keyHandler.isKeyDown(this.keyHandler.KEY_FORWARDS)
    let isBwrd: boolean = this.keyHandler.isKeyDown(this.keyHandler.KEY_BACKWARDS)
    let isJump: boolean = this.keyHandler.isKeyDown(this.keyHandler.KEY_JUMP)

    if (isFwrd) {
      this.accelerate(new Vector(this.settings.lateralAcceleration, 0))
    }
    if (isBwrd) {
      this.accelerate(new Vector(-this.settings.lateralAcceleration, 0))
    }
    if (isJump && !this.isFlying()) {
      this.accelerate(new Vector(0, this.settings.altitudinalAcceleration))
    }

    this.move(time / 1000)
  }

  public move(time: number): void {
    super.move(time)
    if (Math.abs(this.velocity.getX()) < this.settings.lateralAcceleration) {
      this.velocity.setX(0)
    }
    if (!this.keyHandler.isKeyDown(this.keyHandler.KEY_FORWARDS) &&
        !this.keyHandler.isKeyDown(this.keyHandler.KEY_BACKWARDS) &&
        this.velocity.getX() !== 0 ) {

      let plusMinus: number = this.velocity.getX() / Math.abs(this.velocity.getX())
      this.velocity.setX( this.velocity.getX() - this.settings.lateralAcceleration * plusMinus )
    }

    // gravity
    this.accelerate(new Vector(0, -this.settings.gravity))

    // solid check
    let bottomPos: number = (this.position.getY() - this.size.getY() / 2)
    if (bottomPos < 0) {
      this.position.setY( this.size.getY() / 2)
      this.velocity.setY(0)
    }

  }

  public accelerate(dVel: Vector): void {
    super.accelerate(dVel)
    if (Math.abs(this.velocity.getX()) > this.settings.maxLateralVelocity) {
      let plusMinus: number = Math.abs(this.velocity.getX()) / this.velocity.getX()
      this.velocity.setX(this.settings.maxLateralVelocity * plusMinus)
    }
    if (Math.abs(this.velocity.getY()) > this.settings.maxAltitudinalVelocity) {
      let factor: number = Math.abs(this.velocity.getY()) / this.settings.maxAltitudinalVelocity
      this.velocity.setY(this.velocity.getY() / factor)


    }

  }

  private isFlying(): boolean {
    return (this.position.getY() - this.size.getY() / 2) > 0
  }
}
