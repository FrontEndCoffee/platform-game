import { GameObject } from './GameObject'

export class PhysicsEngine {

  private static GRAVITY = 9.81

  public update(gameObjects: GameObject[], deltaTime: number) {
    let dt = deltaTime/1000
    gameObjects.map( obj => {
      obj.move(dt)
    })
  }
}
