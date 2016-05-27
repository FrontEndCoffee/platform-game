import { GameObject } from './GameObject'

export class PhysicsEngine {

  // private static GRAVITY: number = 9.81

  public update(gameObjects: GameObject[], deltaTime: number): void {
    let dt: number = deltaTime / 1000
    gameObjects.map((gameObject: GameObject) => {
      gameObject.move(dt)
    })
  }
}
