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

    /**
     * Draw a platform onto the screen
     * @param   context     rendering context of the canvas that the platform needs to be rendered on
     */
    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.texture.getFillStyle()
        context.fillRect(
            this.position.getX() - this.size.getX() / 2,
            this.position.getY() - this.size.getY() / 2,
            this.size.getX(),
            this.size.getY()
        )
    }
    
    /**
     * calculate physics for the given time period
     * @param   seconds     timeframe over which the physics must be calculated
     */
    public move(seconds: number): void {
        this.velocity = this.velocity.scale(seconds)
    }
}
