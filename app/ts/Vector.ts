export class Vector {

  private x: number
  private y: number

  constructor(x: number, y: number) {
    this.x = (x === undefined) ? 0 : x
    this.y = (y === undefined) ? 0 : y
  }

  public add(v: Vector): Vector {
    return new Vector(this.x + v.getX(), this.y + v.getY())
  }

  public scale(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor)
  }

  public getX(): number {
    return this.x
  }

  public getY(): number {
    return this.y
  }

  public setX(x: number): void {
    this.x = x
  }

  public setY(y: number): void {
    this.y = y
  }
}
