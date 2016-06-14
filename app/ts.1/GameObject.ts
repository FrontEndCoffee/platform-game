import { Vector } from './Vector'

export class GameObject {

  protected position: Vector
  protected velocity: Vector
  protected size: Vector
  protected color: string

  constructor(position: Vector, velocity: Vector, size: Vector, color: string) {
    this.position = position || new Vector(0, 0)
    this.velocity = velocity || new Vector(0, 0)
    this.size = size || new Vector(5, 5)
    this.color = color || '#f00'
  }

  /**
   * Calculates movement of the current GameObject over the given time in seconds
   * @seconds   Time in which the movement must be calculated in seconds
   */
  public move(seconds: number): void {
    this.position = this.position.add(
      this.velocity.scale(seconds)
    )
  }

  /**
   * Changes the speed of the current GameObject
   * @dVel   The vector with which the current GameObject must be changed
   */
  public accelerate(dVel: Vector): void {
    this.velocity = this.velocity.add(dVel)
  }

  /**
   * Translates the current GameObject
   * @dPos  The vector with which the current GameObject must be translated
   */
  public translate(dPos: Vector): void {
    this.position = this.position.add(dPos)
  }

  public setSize(s: Vector): void {
    this.size = s
  }

  public getSize(): Vector {
    return this.size
  }

  public setColor(c: string): void {
    this.color = c
  }

  public getColor(): string {
    return this.color
  }

  public getPosition(): Vector {
    return this.position
  }

  public getVelocity(): Vector {
    return this.velocity
  }
}
