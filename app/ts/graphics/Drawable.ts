import { Vector } from '../physics/Vector'
import { Texture } from './Texture'

export interface Drawable {
    position: Vector
    size: Vector
    texture: Texture

    draw(context: CanvasRenderingContext2D): void
}