import { Texture } from './Texture'

export class ColorTexture extends Texture {

    private color: string

    constructor(color: string) {
        super()
        this.color = color
    }

    public getFillStyle(): string {
        return this.color
    }
}
