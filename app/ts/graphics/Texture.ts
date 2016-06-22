export abstract class Texture {
    public abstract getFillStyle(
        context: CanvasRenderingContext2D
    ): string | CanvasPattern | CanvasGradient
}
