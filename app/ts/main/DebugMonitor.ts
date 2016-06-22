export class DebugMonitor {

  private windowContext: Window
  private keys: string[]
  private values: string[]

  constructor(windowContext: Window) {
    this.windowContext = windowContext
    let doc: any = this.windowContext.document
    let elem: HTMLDivElement = doc.createElement('div')
    elem.id = 'debug_monitor'
    elem.style.position = 'fixed'
    elem.style.top = '0'
    elem.style.left = '0'
    elem.style.fontFamily = 'sans-serif'
    elem.style.zIndex = '2'
    doc.body.appendChild(elem)

    this.keys = []
    this.values = []
  }

  /**
   * Update the DOM to show changes
   */
  public renderDebugElement(): void {
    let content: string = ''
    for (let i: number = 0; i < this.keys.length; i++) {
      content += this.keys[i] + ': ' + this.values[i] + '<br>'
    }
    this.windowContext.document.getElementById('debug_monitor').innerHTML = content
  }

  /**
   * Create a datafield
   * @param   key   name of the datafield
   */
  public createField(key: string): void {
    if (this.keys.indexOf(key) !== -1) {
      throw 'Data field with key ' + key + ' already exists'
    } else {
      this.keys.push(key)
      this.values.push('null')
    }
  }

  /**
   * Remove a datafield
   * @param   key   name of the datafield
   */
  public removeField(key: string): void {
    if (this.keys.indexOf(key) === -1) {
      throw 'Data field with key ' + key + ' does not exist'
    } else {
      let index: number = this.keys.indexOf(key)
      this.keys.splice(index, 1)
      this.values.splice(index, 1)
    }
  }

  /**
   * Update datafield contents
   * @param   key     name of the to be updated datafield
   * @param   value   new value of the datafield
   */
  public updateField(key: string, value: string): void {
    if (this.keys.indexOf(key) === -1) {
      throw 'Data field with key ' + key + ' does not exist'
    } else {
      let index: number = this.keys.indexOf(key)
      this.values[index] = value
    }
  }
}
