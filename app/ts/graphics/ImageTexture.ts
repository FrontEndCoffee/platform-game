import { Texture } from './Texture'

export class ImageTexture extends Texture {

    private image: HTMLImageElement

    constructor(image: HTMLImageElement) {
        super()
        this.image = image
    }

    public getFillStyle(context: CanvasRenderingContext2D): CanvasPattern {
        return context.createPattern(this.image, 'repeat')
    }
}
