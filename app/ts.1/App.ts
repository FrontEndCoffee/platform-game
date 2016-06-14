import { RenderEngine } from './RenderEngine'
import { GameObject } from './GameObject'
import { PhysicsEngine } from './PhysicsEngine'
import { Player } from './gameobjects/Player'
import { KeyHandler } from './KeyHandler'

export class App {

  private engine: RenderEngine
  private gameObjects: GameObject[]
  private keyHandler: KeyHandler
  private latestFrameTimestamp: number
  private settings: any
  private player: Player

  constructor(doc: any, height: number, width: number, settings: any) {
    this.settings = settings
    this.engine = new RenderEngine(doc, height, width, settings.display)
    this.keyHandler = new KeyHandler(settings.keys)
    this.gameObjects = []
    this.latestFrameTimestamp = this.getTime()
    this.player = new Player(this.keyHandler, this.gameObjects, settings.player)
  }

  public update(): void {
    let deltaTime: number = this.getTime() - this.latestFrameTimestamp
    this.latestFrameTimestamp = this.getTime()
    PhysicsEngine.update(this.gameObjects, deltaTime)
    this.player.update(deltaTime)
    this.engine.clearFrame()
    this.gameObjects.forEach((v: GameObject) => {
      this.engine.draw(v)
    })
    this.engine.draw(this.player)
  }

  public addGameObject(obj: GameObject): void {
    this.gameObjects.push(obj)
  }

  public getKeyHandler(): KeyHandler {
    return this.keyHandler
  }

  public getEngine(): RenderEngine {
    return this.engine
  }

  private getTime(): number {
    return new Date().getTime()
  }

}
