import { GameObject } from './GameObject'

export class RenderEngine {

  private canvas: any
  private ctx: any
  private height: number
  private width: number
  private margin: number
  private settings: any

  constructor(document: any, windowHeight: number, windowWidth: number, displaySettings: any) {
    this.settings = displaySettings
    this.height = windowHeight
    this.width = windowWidth
    this.margin = this.settings.margin
    this.canvas = document.createElement('canvas')
    this.canvas.height = this.height
    this.canvas.width = this.width
    this.ctx = this.canvas.getContext('2d')
    // config canvas
    let scale: number = this.height / this.settings.height

    this.ctx.translate(this.settings.margin , this.height)
    this.ctx.scale(scale, -scale)
    this.height /= scale
    this.width /= scale
    this.margin /= scale

    document.body.appendChild(this.canvas)
  }

  /**
   * Renders a GameObject on the canvas
   * @param obj   Game object that is to be rendered on the canvas
   */
  public draw(obj: GameObject): void {
    this.ctx.fillStyle = obj.getColor()
    this.ctx.fillRect(
      obj.getPosition().getX() - obj.getSize().getX() / 2,
      obj.getPosition().getY() - obj.getSize().getY() / 2,
      obj.getSize().getX(),
      obj.getSize().getY()
    )
  }

  /**
   * Clears the entire canvas of all visuals, is supposed to be called at the start of each frame
   */
  public clearFrame(): void {
    this.ctx.clearRect(-this.margin, 0, this.width, this.height)
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
