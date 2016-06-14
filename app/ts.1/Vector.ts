export class Vector {

  private x: number
  private y: number

  constructor(x: number, y: number) {
    this.x = (x === undefined) ? 0 : x
    this.y = (y === undefined) ? 0 : y
  }

  /**
   * Returns the sum of the current vector object and the given vector
   * @param v   The vector with which the current vector object is summed up
   * @return    The sum of the current vector object and the given vector
   */
  public add(v: Vector): Vector {
    return new Vector(this.x + v.getX(), this.y + v.getY())
  }

  /**
   * Returns a new Vector that is the product of the current vector object and the given number
   * @param factor  The number by which the current vector object is multiplied
   * @return        The product of the current vector object and the given factor
   */
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
