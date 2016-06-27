import { Entity } from './Entity'
import { Vector } from '../physics/Vector'
import { ColorTexture } from '../graphics/ColorTexture'
import { KeyHandler } from '../main/KeyHandler'
import { IPlayerEntity } from './IPlayerEntity'

export class PlayerEntity extends Entity implements IPlayerEntity {

  public position: Vector
  public velocity: Vector
  public size: Vector
  public texture: ColorTexture

  private maxVelocity: Vector
  private acceleration: Vector
  private noDirectionalKeysDown: boolean

  constructor(settings: any) {
    super()
    let playerSettings: JSON = settings.getData('player')
    this.position = new Vector(playerSettings['position'][0], playerSettings['position'][1])
    this.velocity = new Vector(playerSettings['velocity'][0], playerSettings['velocity'][1])
    this.size = new Vector(playerSettings['size'][0], playerSettings['size'][1])
    this.texture = new ColorTexture(playerSettings['color'])
    this.maxVelocity = new Vector(
      playerSettings['maxLateralVelocity'],
      playerSettings['maxAltitudinalVelocity']
    )
    this.acceleration = new Vector(
      playerSettings['lateralAcceleration'],
      playerSettings['altitudinalAcceleration']
    )
    this.noDirectionalKeysDown = true
  }

  /**
   * Looks at the state of the keyhandler, and according to the state it will execute actions
   * @param   keyHandler  instance of the keyhandler that keystates are read out of
   */
  public assertInputState(keyHandler: KeyHandler): void {
    let isForwards: boolean = keyHandler.isKeyDown(keyHandler.keyForwards)
    let isBackwards: boolean = keyHandler.isKeyDown(keyHandler.keyBackwards)
    let isJump: boolean = keyHandler.isKeyDown(keyHandler.keyJump)
    let newVelocity: Vector = this.velocity

    if (isForwards) {
      newVelocity = this.velocity.add(new Vector(this.acceleration.getX(), 0))
      if (newVelocity.getX() > this.maxVelocity.getX()) {
        newVelocity.setX(this.maxVelocity.getX())
      }
    }
    if (isBackwards) {
      newVelocity = this.velocity = this.velocity.add(new Vector(-this.acceleration.getX(), 0))
      if (newVelocity.getX() < -this.maxVelocity.getX()) {
        newVelocity.setX(-this.maxVelocity.getX())
      }
    }
    if (isJump) {
      newVelocity = this.velocity.add(new Vector(0, this.acceleration.getY()))
      if (newVelocity.getY() > this.maxVelocity.getY()) {
        newVelocity.setY(this.maxVelocity.getY())
      }
    }

    if (!isForwards && !isBackwards) {
      this.noDirectionalKeysDown = true
    } else {
      this.noDirectionalKeysDown = false
    }

    this.velocity = newVelocity
  }

  /**
   * Render the player onto the canvas
   * @param   renderingContext  rendering context of the canvas the player gets rendered on
   */
  public draw(renderingContext: CanvasRenderingContext2D): void {
    renderingContext.fillStyle = this.texture.getFillStyle()
    renderingContext.fillRect(
      this.position.getX() - this.size.getX() / 2,
      this.position.getY() - this.size.getY() / 2,
      this.size.getX(),
      this.size.getY()
    )
  }

  /**
   * calculate physics for the given time period
   * @param   seconds     timeframe over which the physics must be calculated
   */
  public move(seconds: number): void {
    let resistance: Vector = new Vector(this.acceleration.getX(), 0)
   // let gravity: Vector = new Vector(0, 10)

    this.position = this.position.add(this.velocity.scale(seconds))

    // code for ground resistance
    if (this.noDirectionalKeysDown) {
      if (this.velocity.getX() > 0) {
        if (this.velocity.getX() < resistance.getX()) {
          this.velocity.setX(0)
        } else {
          this.velocity.setX(
            this.velocity.add(resistance.scale(-1)).getX()
          )
        }
      }
      if (this.velocity.getX() < 0) {
        if (this.velocity.getX() > resistance.getX()) {
          this.velocity.setX(0)
        } else {
          this.velocity.setX(
            this.velocity.add(resistance.scale(1)).getX()
          )
        }
      }
    }
  }

  public getVelocity(): Vector {
    return this.velocity
  }
}
