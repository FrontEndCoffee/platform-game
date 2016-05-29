export class KeyHandler {

  private settings: any
  private keysDown: number[]

  public KEY_FORWARDS: string
  public KEY_BACKWARDS: string
  public KEY_JUMP: string

  constructor(settings) {
    this.settings = settings
    this.KEY_FORWARDS = settings.forwards
    this.KEY_BACKWARDS = settings.backwards
    this.KEY_JUMP = settings.jump
  }

  public onKeyDown(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey === -1) {
      this.keysDown.push(key)
    }
  }

  public onKeyUp(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey > -1) {
      this.keysDown.splice(indexOfKey, 1)
    }
  }

  public isKeyUp(key: number): boolean {
    return (this.keysDown.indexOf(key) >= 0)
  }

}
