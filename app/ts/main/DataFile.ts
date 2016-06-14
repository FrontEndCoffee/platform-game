import { DataFileEventTarget } from './DataFileEventTarget'
import { DataFileProgressEvent } from './DataFileProgressEvent'

export class DataFile {

    private callback: Function
    private data: JSON

    constructor(fileURI: string, callback: Function) {
        this.callback = callback
        let request: XMLHttpRequest = new XMLHttpRequest()
        let context: DataFile = this
        request.onload = (event: DataFileProgressEvent) => {
            this.onDataFileLoad(event.target, context)
        }
        request.open('GET', fileURI, true)
        request.send()
    }

    public getData(key: string): JSON {
        return this.data[key]
    }

    private onDataFileLoad(response: DataFileEventTarget, context: DataFile): void {
        context.data = JSON.parse(response.responseText);
        context.callback()
    }
}