import { Texture } from './Texture'

export class ImageTexture extends Texture {

    private image: HTMLImageElement

    constructor(image: HTMLImageElement) {
        super()
        this.image = image
    }

    /**
     * Generates a fillstyle for this particular type of texture
     * @param   context     The rendering context of the current canvas
     * @returns             A fill style to be used elswheyr
     */
    public getFillStyle(context: CanvasRenderingContext2D): CanvasPattern {
        return context.createPattern(this.image, 'repeat')
    }
}
