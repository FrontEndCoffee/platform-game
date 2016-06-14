import { Vector } from '../physics/Vector'
import { DataFile } from '../main/DataFile'

export class Canvas {
    
    private physicalResolution: Vector
    private virtualResolution: Vector

    constructor(context: Window, settings: DataFile) {
        let displaySettings: JSON = settings['display']
        let physicalHeight: number = context.innerHeight
        let physicalWidth : number= context.innerWidth
        let virtualHeight: number = displaySettings.height
        let scale: number = virtualHeight / physicalHeight
        let virtualWidth: number = physicalWidth * scale

        this.physicalResolution = new Vector(physicalWidth, physicalHeight)
        this.virtualResolution = new Vector(virtualWidth, virtualHeight)
    }

    
}