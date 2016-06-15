import { Vector } from './Vector'
import { KeyHandler} from '../main/KeyHandler'

export interface Controllable {
    position: Vector
    velocity: Vector
    keyHandler: KeyHandler

    update(): void
}