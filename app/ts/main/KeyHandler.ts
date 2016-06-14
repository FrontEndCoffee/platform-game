import { DataFile } from './DataFile'

export class KeyHandler {

    public keyForwards: number
    public keyBackwards: number
    public keyJump: number

    private settings: JSON
    private keysDown: number[]

  constructor(settings: any) {
    this.settings = settings.getData("keys")
    this.keysDown = []
    this.keyForwards = this.settings['forwards']
    this.keyBackwards = this.settings['backwards']
    this.keyJump = this.settings['jump']
  }

  /**
   * Registers the press of a key
   * @key   Registers this key as pressed
   */
  public onKeyDown(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey === -1) {
      this.keysDown.push(key)
    }
  }

  /**
   * Registers the release of a key
   * @key   Registers this key as released
   */
  public onKeyUp(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey > -1) {
      this.keysDown.splice(indexOfKey, 1)
    }
  }

  /**
   * Returns wheter a key is being held down since the inception of this instance
   * @param   What key to return the hold-down state of
   */
  public isKeyDown(key: number): boolean {
    return (this.keysDown.indexOf(key) >= 0)
  }

}