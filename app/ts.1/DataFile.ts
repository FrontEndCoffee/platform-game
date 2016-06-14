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

  /**
   * Returns the file extention of the filename in the given string
   * @param file  File name
   * @return      File extention of the given file name
   */
  private getFileType(file: string): string {
    let temp: string[] = file.split('.')
    if (temp.length < 2) {
      throw 'Invalid File ' + file
    }
    return temp[temp.length - 1].toLowerCase()
  }

  /**
   * Callback function that gets called when the file has been loaded
   * @param file    XMLHttpRequest event object
   * @param context The scope of the current DataFile instance
   */
  private onDataFileLoaded(file: any, context: DataFile): void {
    context.fileContents = context.parseDataFile(file.target.responseText, this.fileType)
    context.callback(context.fileContents)
  }

  /**
   * Parses raw file contents if the filetype is known, if not, it will return the raw file contents
   * @param rawFileContents   Plain text file contents, to be parsed by this method
   * @param fileType          File extention   
   */
  private parseDataFile(rawFileContents: string, fileType: string): any {
    switch (fileType.toLowerCase()) {
      case 'json':
        return JSON.parse(rawFileContents)
      default:
        return rawFileContents
    }
  }

}
