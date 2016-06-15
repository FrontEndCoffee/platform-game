import { Vector } from './Vector'

export interface Moving {
    position: Vector
    velocity: Vector

    move(seconds: number): void
}