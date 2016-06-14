import { Vector } from './Vector'
import { KeyHandler} from '../main/KeyHandler'

export interface IControllable {
    position: Vector
    velocity: Vector
    keyHandler: KeyHandler

    update(): void
}