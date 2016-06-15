import { Vector } from '../physics/Vector'
import { DataFile } from '../main/DataFile'
import { Drawable } from './Drawable'

export class Canvas {
    
    private physicalResolution: Vector
    private virtualResolution: Vector
    private context: Window
    private canvasElement: HTMLCanvasElement
    private renderingContext: CanvasRenderingContext2D

    constructor(context: Window, settings: DataFile) {

        let displaySettings: JSON = settings['display']
        let physicalHeight: number = context.innerHeight
        let physicalWidth : number= context.innerWidth
        let virtualHeight: number = displaySettings['height']
        let scale: number = virtualHeight / physicalHeight
        let virtualWidth: number = physicalWidth * scale

        this.physicalResolution = new Vector(physicalWidth, physicalHeight)
        this.virtualResolution = new Vector(virtualWidth, virtualHeight)
        this.context = context

        this.canvasElement = context.document.createElement('canvas')
        this.canvasElement.height = this.physicalResolution.getY()
        this.canvasElement.width = this.physicalResolution.getX()
        this.renderingContext = this.canvasElement.getContext('2d')
        this.renderingContext.scale(scale, scale)
    }

    public clearFrame(): void {
        this.renderingContext.clearRect(
            0, 0, this.virtualResolution.getX(), this.virtualResolution.getY()
        )
    }
    
    public draw(drawable: Drawable): void {
        drawable.draw(this.renderingContext)
    }

    public getVirtualResolution(): Vector {
        return this.virtualResolution
    }
    
}
