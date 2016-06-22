import { Vector } from '../physics/Vector'
import { Texture } from './Texture'

export interface IDrawable {
    position: Vector
    size: Vector
    texture: Texture

    draw(context: CanvasRenderingContext2D): void
}
