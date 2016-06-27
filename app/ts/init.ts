import { DataFile } from './main/DataFile'
import { World } from './universe/World'
import { Level } from './universe/Level'
import { Canvas } from './graphics/Canvas'
import { IDrawable } from './graphics/IDrawable'
import { KeyHandler } from './main/KeyHandler'
import { DebugMonitor } from './main/DebugMonitor'


let settingsFile: DataFile = new DataFile('../res/settings.json', function(): void {
  let levelFile: DataFile = new DataFile('../res/levelfile.json', function(): void {

    let world: World = new World(levelFile, settingsFile)
    let currentLevel: Level = world.getLevel(0)
    let canvas: Canvas = new Canvas(window, settingsFile)
    let keyHandler: KeyHandler = new KeyHandler(settingsFile)
    let timestamp: number = +new Date()
    let debugMonitor: DebugMonitor = new DebugMonitor(window)

    debugMonitor.createField('fps')
    debugMonitor.createField('player_x')
    debugMonitor.createField('player_y')

    setInterval((_: any) => debugMonitor.renderDebugElement(), 400)

    // rendering loop
    let drawFrame: any = () => {
      // calculate time between frames
      let newTimestamp: number = +new Date()
      let frameTime: number = newTimestamp - timestamp
      timestamp = newTimestamp

      // debug monitor
      debugMonitor.updateField('fps', Math.round(1000 / frameTime).toString())
      debugMonitor.updateField('player_x', currentLevel.getPlayer().getVelocity().getX().toString())
      debugMonitor.updateField('player_y', currentLevel.getPlayer().getVelocity().getY().toString())

      // process user input
      currentLevel.getPlayer().assertInputState(keyHandler)

      // physics will go here
      console.log(frameTime)
      currentLevel.getPlayer().move(frameTime / 1000)

      // clear previous frame
      canvas.clearFrame()

      // draw all drawables in current level
      currentLevel.getDrawableEntities().map((drawable: IDrawable) => {
        drawable.draw(canvas.getRenderingContext())
      })

      // draw player
      currentLevel.getPlayer().draw(canvas.getRenderingContext())

      window.requestAnimationFrame(drawFrame)
    }

    // link keystroke events to handler
    window.addEventListener('keyup', (ev: KeyboardEvent) => keyHandler.onKeyEvent(ev) )
    window.addEventListener('keydown', (ev: KeyboardEvent) => keyHandler.onKeyEvent(ev) )


    // start drawing
    drawFrame()
  })
})
