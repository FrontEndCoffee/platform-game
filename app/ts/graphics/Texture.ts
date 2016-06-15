
export abstract class Texture {
    abstract getFillStyle(context: CanvasRenderingContext2D): string | CanvasPattern | CanvasGradient
}