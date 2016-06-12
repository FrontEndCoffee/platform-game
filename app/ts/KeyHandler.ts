export class KeyHandler {

  public KEY_FORWARDS: number
  public KEY_BACKWARDS: number
  public KEY_JUMP: number

  private settings: any
  private keysDown: number[]

  constructor(settings: any) {
    this.settings = settings
    this.keysDown = []
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

  public isKeyDown(key: number): boolean {
    return (this.keysDown.indexOf(key) >= 0)
  }

}
