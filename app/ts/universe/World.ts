import { Level } from './Level'

export class World {
    
    private levels: Level[]

    constructor(levelFile: any) {
        this.levels = []
        for (let level in levelFile.getData('levels')) {
            this.levels.push(new Level(levelFile.getData('levels')[level]))
        }
    }

    public getLevel(id: number): Level {
        if (this.levels[id]===undefined) {
            throw 'level with id: '+ id +' does not exist'
        }
        return this.levels[id]
    }
}