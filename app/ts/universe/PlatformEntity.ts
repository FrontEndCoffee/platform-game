import { Entity } from './Entity'
import { Vector } from '../physics/Vector'
import { Moving } from '../physics/Moving'
import { Drawable } from '../graphics/Drawable'
import { ColorTexture } from '../graphics/ColorTexture'
import { Canvas } from '../graphics/Canvas'

interface Platform extends Moving, Drawable {}

export class PlatformEntity extends Entity implements Platform {

    position: Vector
    velocity: Vector
    size: Vector
    texture: ColorTexture

    constructor(position: Vector, velocity: Vector, size: Vector, color: string) {
        super()
        this.position = position
        this.velocity = velocity
        this.size = size
        this.texture = new ColorTexture(color)
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.texture.getFillStyle()
        context.fillRect(
            this.position.getX() - this.size.getX() / 2,
            this.position.getY() - this.size.getY() / 2,
            this.size.getX(),
            this.size.getY()
        )
    }

    public move(seconds: number): void {
        this.velocity = this.velocity.scale(seconds)
    }
}