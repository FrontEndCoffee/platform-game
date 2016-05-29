import { App } from './App'
import { GameObject } from './GameObject'
import { Vector } from './Vector'
import { DataFile } from './DataFile'

window.onload = () => {
  console.log(new DataFile('../res/settings.json', (settings: any) => {
    let platformer: App = new App(
      document,
      window.innerHeight,
      window.innerWidth,
      settings
    )
    window.onkeydown = (e: any) => platformer.onKeyDown(e.keyCode)
    window.onkeyup = (e: any) => platformer.onKeyUp(e.keyCode)

    console.log(new DataFile('../res/levelfile.json', (levelfile: any) => {
      levelfile.gameObjects.map((obj: any) => {
        platformer.addGameObject(
          new GameObject(
            new Vector(obj[0], obj[1]),
            new Vector(obj[2], obj[3]),
            new Vector(obj[4], obj[5]),
            obj[6]
          )
        )
      })
    }))

    let run: any = () => {
      platformer.update()
      requestAnimationFrame(run)
    }
    run()
  }))
}
