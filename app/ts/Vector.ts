export class Vector {

  private x: number
  private y: number

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
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
}
