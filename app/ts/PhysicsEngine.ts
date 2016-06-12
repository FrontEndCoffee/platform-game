import { GameObject } from './GameObject'

export class PhysicsEngine {

  // private static GRAVITY: number = 9.81

  /**
   * Processes the movement of all the given gameobjects over the given time
   * @param gameObjects   An array of the to be processed GameObjects
   * @param deltaTime     Timeframe for which to calculate physics (in milliseconds) 
   */
  public static update(gameObjects: GameObject[], deltaTime: number): void {
    let dt: number = deltaTime / 1000
    gameObjects.map((gameObject: GameObject) => {
      gameObject.move(dt)
    })
  }

  /**
   * `isHit` compares two GameObjects and returns if they are overlapping (hit detection)
   * @param a   GameObject  you want to compare to b
   * @param b   GameObject  you want to compare to a
   * @return    boolean     do the given GameObjects overlap?
   */
  public static isHit(a: GameObject, b: GameObject): boolean {
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
