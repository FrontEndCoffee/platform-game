export class DataFile {

  private fileContents: string
  private fileType: string
  private callback: any

  constructor(fileURI: string, callback: any) {
    this.callback = callback
    this.fileType = this.getFileType(fileURI)
    let request: XMLHttpRequest = new XMLHttpRequest()
    let context: DataFile = this
    request.onload = (req: any) => {
      this.onDataFileLoaded(req, context)
    }
    request.open('GET', fileURI, true)
    request.send()
  }

  private getFileType(file: string): string {
    let temp: string[] = file.split('.')
    if (temp.length < 2) {
      throw 'Invalid File ' + file
    }
    return temp[temp.length - 1].toLowerCase()
  }

  private onDataFileLoaded(file: any, context: DataFile): void {
    context.fileContents = context.parseDataFile(file.target.responseText)
    context.callback(context.fileContents)
  }

  private parseDataFile(rawFileContents: string): any {
    switch (this.fileType) {
      case 'json':
      return JSON.parse(rawFileContents)
      default:
      return rawFileContents
    }
  }

}
