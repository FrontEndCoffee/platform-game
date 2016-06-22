import { IControllable } from '../physics/IControllable'
import { IMoving } from '../physics/IMoving'
import { IHitBox } from '../physics/IHitBox'
import { IDrawable } from '../graphics/IDrawable'

export interface IPlayerEntity extends IControllable, IDrawable, IMoving, IHitBox {}
