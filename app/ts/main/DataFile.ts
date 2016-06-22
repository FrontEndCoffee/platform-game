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

    /**
     * Extract data from the datafile
     * @param   key     key of the JSON object you want to extract
     * @return          JSON object
     */
    public getData(key: string): JSON {
        return this.data[key]
    }

    /**
     * event handler for the XMLHttpRequest in the constructor
     * @param	response	the HTTP response object
     * @param 	context     the current datafile instance  
     */
    private onDataFileLoad(response: IDataFileEventTarget, context: DataFile): void {
        context.data = JSON.parse(response.responseText);
        context.callback()
    }
}
