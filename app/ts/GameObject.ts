import { Vector } from './Vector'

export class GameObject {

  private position: Vector
  private velocity: Vector
  private size: Vector
  private color: string

  constructor(position: Vector, velocity: Vector, size: Vector) {
    this.position = position || new Vector(0, 0)
    this.velocity = velocity || new Vector(0, 0)
    this.size = size || new Vector(5, 5)
    this.color = '#f00'
  }

  public move(seconds: number): void {
    this.position = this.position.add(
      this.velocity.scale(seconds)
    )
  }

  public accelerate(dVel: Vector): void {
    this.velocity = this.velocity.add(dVel)
  }

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
