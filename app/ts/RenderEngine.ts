import { GameObject } from './GameObject'

export class RenderEngine {

  private canvas: any
  private ctx: any
  private height: number
  private width: number

  constructor(document: any, windowHeight: number, windowWidth: number) {
    this.height = windowHeight
    this.width = windowWidth
    this.canvas = document.createElement('canvas')
    this.canvas.height = this.height
    this.canvas.width = this.width
    this.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)
  }

  public draw(obj: GameObject): void {
    this.ctx.fillStyle = obj.getColor()
    this.ctx.fillRect(
      obj.getPosition().getX(),
      obj.getPosition().getY(),
      obj.getSize().getX(),
      obj.getSize().getY()
    )
  }

  public clearFrame(): void {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  public getHeight(): number {
    return this.height
  }

  public getWidth(): number {
    return this.width
  }

  public getContext(): any {
    return this.ctx
  }

  public getCanvas(): any {
    return this.canvas
  }

}
