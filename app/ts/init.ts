import { DataFile } from './main/Datafile'
import { World } from './universe/World'

let levelFile: DataFile = new DataFile('../res/levelfile.json', function() {
    let world: World = new World(levelFile)
})