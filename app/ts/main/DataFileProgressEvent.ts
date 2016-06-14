import { DataFileEventTarget } from './DataFileEventTarget'

export interface DataFileProgressEvent extends ProgressEvent {
    target: DataFileEventTarget
}