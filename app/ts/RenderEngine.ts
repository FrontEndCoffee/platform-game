import { GameObject } from './GameObject'

export class RenderEngine {

  private canvas: any
  private ctx: any
  private height: number
  private width: number
  private settings: any

  constructor(document: any, windowHeight: number, windowWidth: number, displaySettings: any) {
    this.settings = displaySettings
    this.height = windowHeight
    this.width = windowWidth
    this.canvas = document.createElement('canvas')
    this.canvas.height = this.height
    this.canvas.width = this.width
    this.ctx = this.canvas.getContext('2d')
    // config canvas
    let scale: number = this.height / this.settings.height
    this.ctx.translate(this.settings.margin , this.height)
    console.log(scale, this.settings.height, this.height)
    this.ctx.scale(scale, -scale)

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
