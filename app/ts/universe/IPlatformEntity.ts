import { IMoving } from '../physics/IMoving'
import { IDrawable } from '../graphics/IDrawable'

export interface IPlatformEntity extends IMoving, IDrawable {}
