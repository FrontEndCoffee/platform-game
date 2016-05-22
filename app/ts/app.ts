import { RenderEngine } from './RenderEngine'
import { GameObject } from './GameObject'
import { Vector } from './Vector'

class App {

  private engine: RenderEngine
  private keysDown: number[]
  private gameObjects: GameObject[]

  constructor(doc: any, height: number, width: number) {
    this.engine = new RenderEngine(doc, height, width)
    this.keysDown = []
    this.gameObjects = []
  }

  public update(): void {
    // add physics
    this.engine.clearFrame()
    this.gameObjects.forEach((v: GameObject) => {
      this.engine.draw(v)
    })
  }

  public addGameObject(obj: GameObject): void {
    this.gameObjects.push(obj)
  }

  public onKeyDown(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey === -1) {
      this.keysDown.push(key)
      console.log(this.keysDown)
    }
  }

  public onKeyUp(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey > -1) {
      this.keysDown.splice(indexOfKey, 1)
      console.log(this.keysDown)
    }
  }

  public getKeysDown(): number[] {
    return this.keysDown
  }

  public getEngine(): RenderEngine {
    return this.engine
  }

}



// init code

window.onload = () => {
  let platformer: App = new App(
    document,
    window.innerHeight,
    window.innerWidth
  )
  window.onkeydown = (e: any) => platformer.onKeyDown(e.keyCode)
  window.onkeyup = (e: any) => platformer.onKeyUp(e.keyCode)

  // debug code
  platformer.addGameObject(new GameObject(
    new Vector(10, 10),
    new Vector(10, 10),
    new Vector(10, 10)
  ))
  platformer.update()
}
