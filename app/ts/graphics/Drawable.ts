import { Vector } from '../physics/Vector'
import { Canvas } from './Canvas'

export interface Drawable {
    position: Vector
    size: Vector
    color: string

    draw(canvas: Canvas): void
}