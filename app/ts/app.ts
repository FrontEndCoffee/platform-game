import { RenderEngine } from './RenderEngine'
import { GameObject } from './GameObject'
import { Vector } from './Vector'
import { PhysicsEngine } from './PhysicsEngine'

class App {

  private engine: RenderEngine
  private physics: PhysicsEngine
  private gameObjects: GameObject[]
  private keysDown: number[]
  private latestFrameTimestamp: number


  constructor(doc: any, height: number, width: number) {
    this.engine = new RenderEngine(doc, height, width)
    this.physics = new PhysicsEngine()
    this.keysDown = []
    this.gameObjects = []
    this.latestFrameTimestamp = this.getTime()
  }

  public update(): void {
    let deltaTime = this.getTime() - this.latestFrameTimestamp
    this.latestFrameTimestamp = this.getTime()
    this.physics.update(this.gameObjects, deltaTime)
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
    }
  }

  public onKeyUp(key: number): void {
    let indexOfKey: number = this.keysDown.indexOf(key)
    if (indexOfKey > -1) {
      this.keysDown.splice(indexOfKey, 1)
    }
  }

  public getKeysDown(): number[] {
    return this.keysDown
  }

  public getEngine(): RenderEngine {
    return this.engine
  }

  private getTime(): number {
    return new Date().getTime()
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
  platformer.addGameObject(new GameObject(
    new Vector(30, 10),
    new Vector(10, 10),
    new Vector(10, 10)
  ))
  let run = () => {
    platformer.update()
    requestAnimationFrame(run)
  }
  run()
}
