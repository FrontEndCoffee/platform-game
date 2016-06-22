import { DataFile } from './main/Datafile'
import { World } from './universe/World'
import { Level } from './universe/Level'
import { Canvas } from './graphics/Canvas'
import { IDrawable } from './graphics/IDrawable'
import { KeyHandler } from './main/KeyHandler'


let settingsFile: DataFile = new DataFile('../res/settings.json', function(): void {
  let levelFile: DataFile = new DataFile('../res/levelfile.json', function(): void {

    let world: World = new World(levelFile, settingsFile)
    let currentlevel: Level = world.getLevel(0)
    let canvas: Canvas = new Canvas(window, settingsFile)
    let keyHandler: KeyHandler = new KeyHandler(settingsFile)
    let timestamp: number = +new Date()

    // rendering loop
    let drawFrame: any = () => {
      // calculate time between frames
      let newTimestamp: number = +new Date()
      let frameTime: number = newTimestamp - timestamp
      timestamp = newTimestamp

      // clear previous frame
      canvas.clearFrame()

      // physics will go here
      console.log(frameTime)

      // draw all drawables in current level
      currentlevel.getDrawableEntities().map((drawable: IDrawable) => {
        drawable.draw(canvas.getRenderingContext())
      })

      window.requestAnimationFrame(drawFrame)
    }

    // link keystroke events to handler
    window.addEventListener('keyup', (ev: KeyboardEvent) => keyHandler.onKeyEvent(ev) )
    window.addEventListener('keydown', (ev: KeyboardEvent) => keyHandler.onKeyEvent(ev) )


    // start drawing
    drawFrame()
  })
})
