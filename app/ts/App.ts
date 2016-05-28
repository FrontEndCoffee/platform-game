import { RenderEngine } from './RenderEngine'
import { GameObject } from './GameObject'
import { PhysicsEngine } from './PhysicsEngine'

export class App {

  private engine: RenderEngine
  private physics: PhysicsEngine
  private gameObjects: GameObject[]
  private keysDown: number[]
  private latestFrameTimestamp: number
  private settings: any

  constructor(doc: any, height: number, width: number, settings: any) {
    this.settings = settings
    this.engine = new RenderEngine(doc, height, width, settings.display)
    this.physics = new PhysicsEngine()
    this.keysDown = []
    this.gameObjects = []
    this.latestFrameTimestamp = this.getTime()
  }

  public update(): void {
    let deltaTime: number = this.getTime() - this.latestFrameTimestamp
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
