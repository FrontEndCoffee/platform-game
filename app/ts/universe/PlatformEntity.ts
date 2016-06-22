import { Entity } from './Entity'
import { Vector } from '../physics/Vector'
import { IPlatformEntity } from './IPlatformEntity'
import { ColorTexture } from '../graphics/ColorTexture'

export class PlatformEntity extends Entity implements IPlatformEntity {

    public position: Vector
    public velocity: Vector
    public size: Vector
    public texture: ColorTexture
    public isDrawable: boolean = true
    public hasPhysics: boolean = true

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
