import { Vector } from './Vector'

export interface IMoving {
    position: Vector
    velocity: Vector

    move(seconds: number): void
}
