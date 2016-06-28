import { DataFile } from './main/DataFile'
import { World } from './universe/World'
import { Level } from './universe/Level'
import { Canvas } from './graphics/Canvas'
import { IDrawable } from './graphics/IDrawable'
import { IHitBox } from './physics/IHitBox'
import { KeyHandler } from './main/KeyHandler'
import { DebugMonitor } from './main/DebugMonitor'
import { PlayerEntity } from './universe/PlayerEntity'

let settingsFile: DataFile = new DataFile('../res/settings.json', function(): void {
  let levelFile: DataFile = new DataFile('../res/levelfile.json', function(): void {

    let world: World = new World(levelFile, settingsFile)
    let currentLevel: Level = world.getLevel(0)
    let canvas: Canvas = new Canvas(window, settingsFile)
    let keyHandler: KeyHandler = new KeyHandler(settingsFile)
    let timestamp: number = +new Date()
    let debugMonitor: DebugMonitor = new DebugMonitor(window)

    debugMonitor.createField('fps')
    debugMonitor.createField('flying')

    setInterval((_: any) => debugMonitor.renderDebugElement(), 200)

    // rendering loop
    let drawFrame: any = () => {
      // calculate time between frames
      let newTimestamp: number = +new Date()
      let frameTime: number = newTimestamp - timestamp
      timestamp = newTimestamp

      // debug monitor
      debugMonitor.updateField('fps', Math.round(1000 / frameTime).toString())
      debugMonitor.updateField('flying', currentLevel.getPlayer().isFlying.toString())

      // process user input
      currentLevel.getPlayer().assertInputState(keyHandler)

      // physics will go here
      currentLevel.getPlayer().move(frameTime / 1000)

      // check player collision
      let player: PlayerEntity = currentLevel.getPlayer()
      let gravity: number = settingsFile.getData('player')['gravity']
      let proximateEntityCount: number = 0

      currentLevel.getPhysicalEntities().map((entity: IHitBox) => {

        let entityTop: number = entity.position.add(entity.size.scale(0.5)).getY()
        let playerBottom: number = player.position.add(player.size.scale(-0.5)).getY()
        let heightDiff: number = playerBottom - entityTop
        let currentVelocity: number = player.velocity.scale(frameTime / 1000).getY()

        if (player.isTouching(entity) &&
            heightDiff <= 0 &&
            heightDiff > currentVelocity ) {

          player.position.setY(
            entity.position
              .add(entity.size.scale(0.5))
              .add(player.size.scale(0.5))
              .getY()
          )
          player.velocity.setY(0)
        }

        if (player.isLateralOverlap(entity) && Math.abs(heightDiff) <= gravity) {
          proximateEntityCount++
        }

      })

      player.isFlying = proximateEntityCount === 0

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
