import { DataFile } from './DataFile'

export class KeyHandler {

    public keyForwards: string
    public keyBackwards: string
    public keyJump: string

    private settings: JSON
    private keysDown: string[]

  constructor(settings: any) {
    this.settings = settings.getData("keys")
    this.keysDown = []
    this.keyForwards = this.settings['forwards']
    this.keyBackwards = this.settings['backwards']
    this.keyJump = this.settings['jump']
  }

  /**
   * Acts according to the given keyboard event type
   * @param event   Event data from keyboard event
   */
  public onKeyEvent(event: KeyboardEvent): void {
    let key: string = event.key
    let index: number = this.keysDown.indexOf(key)
    switch (event.type) {

      case 'keyup':
        if (index > -1) {
          this.keysDown.splice(index, 1)
        }
        break

      case 'keydown':
        if (index === -1) {
          this.keysDown.push(key)
        }
        break

      default:
        throw 'unknown keyevent: ' + event.type 
    }
  }

  /**
   * Returns wheter a key is being held down since the inception of this instance
   * @param   What key to return the hold-down state of
   */
  public isKeyDown(key: string): boolean {
    return (this.keysDown.indexOf(key) >= 0)
  }

}