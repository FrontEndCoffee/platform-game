import { Vector } from '../physics/Vector'
import { IDrawable } from './IDrawable'

export class Canvas {

    private physicalResolution: Vector
    private virtualResolution: Vector
    private context: Window
    private canvasElement: HTMLCanvasElement
    private renderingContext: CanvasRenderingContext2D

    constructor(context: Window, settings: any) {

        let displaySettings: JSON = settings.getData('display')
        let physicalHeight: number = context.innerHeight
        let physicalWidth: number = context.innerWidth
        let virtualHeight: number = displaySettings['height']
        let scale: number = virtualHeight / physicalHeight
        let virtualWidth: number = physicalWidth * scale

        this.physicalResolution = new Vector(physicalWidth, physicalHeight)
        this.virtualResolution = new Vector(virtualWidth, virtualHeight)
        this.context = context

        this.canvasElement = context.document.createElement('canvas')
        this.canvasElement.height = this.physicalResolution.getY()
        this.canvasElement.width = this.physicalResolution.getX()

        window.document.body.appendChild(this.canvasElement)

        this.renderingContext = this.canvasElement.getContext('2d')
        this.renderingContext.scale(1 / scale, 1 / scale)
        this.renderingContext.translate(0, this.virtualResolution.getY())
        this.renderingContext.scale(1, -1)
    }

    public clearFrame(): void {
        this.renderingContext.clearRect(
            0, 0, this.virtualResolution.getX(), this.virtualResolution.getY()
        )
    }

    public draw(drawable: IDrawable): void {
        drawable.draw(this.renderingContext)
    }

    public getVirtualResolution(): Vector {
        return this.virtualResolution
    }

    public getRenderingContext(): CanvasRenderingContext2D {
        return this.renderingContext
    }

}
