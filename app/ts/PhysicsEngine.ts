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
    let aMaxX: number = a.getPosition().getX() + a.getSize().getX() / 2
    let aMinX: number = a.getPosition().getX() - a.getSize().getX() / 2
    let aMaxY: number = a.getPosition().getY() + a.getSize().getY() / 2
    let aMinY: number = a.getPosition().getY() - a.getSize().getY() / 2

    let bMaxX: number = b.getPosition().getX() + b.getSize().getX() / 2
    let bMinX: number = b.getPosition().getX() - b.getSize().getX() / 2
    let bMaxY: number = b.getPosition().getY() + b.getSize().getY() / 2
    let bMinY: number = b.getPosition().getY() - b.getSize().getY() / 2

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
