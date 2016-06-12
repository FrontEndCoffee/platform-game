import { GameObject } from './GameObject'

export class PhysicsEngine {

  // private static GRAVITY: number = 9.81

  public update(gameObjects: GameObject[], deltaTime: number): void {
    let dt: number = deltaTime / 1000
    gameObjects.map((gameObject: GameObject) => {
      gameObject.move(dt)
    })
  }

  public isHit(a: GameObject, b: GameObject): boolean {
    let aMaxX = a.getPosition().getX() + a.getSize().getX() / 2
    let aMinX = a.getPosition().getX() - a.getSize().getX() / 2
    let aMaxY = a.getPosition().getY() + a.getSize().getY() / 2
    let aMinY = a.getPosition().getY() - a.getSize().getY() / 2

    let bMaxX = b.getPosition().getX() + b.getSize().getX() / 2
    let bMinX = b.getPosition().getX() - b.getSize().getX() / 2
    let bMaxY = b.getPosition().getY() + b.getSize().getY() / 2
    let bMinY = b.getPosition().getY() - b.getSize().getY() / 2
    
    return (
      (
        ((aMaxX > bMinX) && (bMaxX > aMinX)) ||
        ((aMinX > bMinX) && (bMaxX > aMinX))
      ) && (
        ((aMaxY > bMinY) && (bMaxY > aMinY)) ||
        ((aMinY > bMinY) && (bMaxY > aMinY))
      )
    )
  }
}
