import { Vector } from '../physics/Vector'

export abstract class Entity {
    public isDrawable: boolean
    public isPhysical: boolean
    public position: Vector
}
