import { Vector } from '../physics/Vector'

export abstract class Entity {
    public isDrawable: boolean
    public hasPhysics: boolean
    position: Vector
}