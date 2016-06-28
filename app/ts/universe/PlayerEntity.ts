import { Entity } from './Entity'
import { Vector } from '../physics/Vector'
import { ColorTexture } from '../graphics/ColorTexture'
import { KeyHandler } from '../main/KeyHandler'
import { IPlayerEntity } from './IPlayerEntity'
import { IHitBox } from '../physics/IHitBox'


export class PlayerEntity extends Entity implements IPlayerEntity {

  public position: Vector
  public velocity: Vector
  public size: Vector
  public texture: ColorTexture
  public isFlying: boolean

  private maxVelocity: Vector
  private acceleration: Vector
  private noDirectionalKeysDown: boolean
  private gravity: number
  private userHasLetGoOfTheJumpKey: boolean

  constructor(settings: any) {
    super()
    let playerSettings: JSON = settings.getData('player')
    this.isFlying = false
    this.gravity = playerSettings['gravity']
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
    this.userHasLetGoOfTheJumpKey = true
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
    if (isJump && !this.isFlying && this.userHasLetGoOfTheJumpKey) {
      this.userHasLetGoOfTheJumpKey = false
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

    if (!isJump) {
      this.userHasLetGoOfTheJumpKey = true
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
    let gravity: Vector = new Vector(0, -this.gravity)

    // process basic movement
    this.position = this.position.add(this.velocity.scale(seconds))

    // gravity
    this.velocity = this.velocity.add(gravity)
    // if (this.position.add(this.size.scale(-0.5)).getY() <= 0) {
    //   this.position.setY(this.size.scale(0.5).getY())
    //   this.velocity.setY(0)
    // }

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

  public isTouching(entity: IHitBox): boolean {
    return this.isAltidunalOverlap(entity) && this.isLateralOverlap(entity)
  }

  public isAltidunalOverlap(entity: IHitBox): boolean {
    let entityMaxY: number = entity.position.add(entity.size.scale(0.5)).getY()
    let entityMinY: number = entity.position.add(entity.size.scale(-0.5)).getY()
    let playerMaxY: number = this.position.add(this.size.scale(0.5)).getY()
    let playerMinY: number = this.position.add(this.size.scale(-0.5)).getY()

    return (
      ((entityMaxY > playerMinY) && (playerMaxY > entityMinY)) ||
      ((entityMinY > playerMinY) && (playerMaxY > entityMinY))
    )
  }

  public isLateralOverlap(entity: IHitBox): boolean {
    let entityMaxX: number = entity.position.add(entity.size.scale(0.5)).getX()
    let entityMinX: number = entity.position.add(entity.size.scale(-0.5)).getX()
    let playerMaxX: number = this.position.add(this.size.scale(0.5)).getX()
    let playerMinX: number = this.position.add(this.size.scale(-0.5)).getX()

    return (
      ((entityMaxX > playerMinX) && (playerMaxX > entityMinX)) ||
      ((entityMinX > playerMinX) && (playerMaxX > entityMinX))
    )
  }
}
