import { IDataFileEventTarget } from './IDataFileEventTarget'
import { IDataFileProgressEvent } from './IDataFileProgressEvent'

export class DataFile {

    private callback: Function
    private data: JSON

    constructor(fileURI: string, callback: Function) {
        this.callback = callback
        let request: XMLHttpRequest = new XMLHttpRequest()
        let context: DataFile = this
        request.onload = (event: IDataFileProgressEvent) => {
            this.onDataFileLoad(event.target, context)
        }
        request.open('GET', fileURI, true)
        request.send()
    }

    public getData(key: string): JSON {
        return this.data[key]
    }

    private onDataFileLoad(response: IDataFileEventTarget, context: DataFile): void {
        context.data = JSON.parse(response.responseText);
        context.callback()
    }
}
