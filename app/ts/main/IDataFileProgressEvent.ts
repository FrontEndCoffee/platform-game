import { IDataFileEventTarget } from './IDataFileEventTarget'

export interface IDataFileProgressEvent extends ProgressEvent {
    target: IDataFileEventTarget
}
