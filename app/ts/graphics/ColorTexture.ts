import { Texture } from './Texture'

export class ColorTexture extends Texture {

    private color: string

    constructor(color: string) {
        super()
        this.color = color
    }

    /**
     * Generates a fillstyle for this particular type of texture
     * @returns             A fill style to be used elswhere
     */
    public getFillStyle(): string {
        return this.color
    }
}
