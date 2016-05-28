import { App } from './App'
import { GameObject } from './GameObject'
import { Vector } from './Vector'
import { DataFile } from './DataFile'

window.onload = () => {
  new DataFile('../res/settings.json', (settings: any) => {
    let platformer: App = new App(
      document,
      window.innerHeight,
      window.innerWidth,
      settings
    )
    window.onkeydown = (e: any) => platformer.onKeyDown(e.keyCode)
    window.onkeyup = (e: any) => platformer.onKeyUp(e.keyCode)

    platformer.addGameObject(new GameObject(
      new Vector(10, 10),
      new Vector(10, 10),
      new Vector(10, 10)
    ))

    let run: any = () => {
      platformer.update()
      requestAnimationFrame(run)
    }
    run()
  })
}
