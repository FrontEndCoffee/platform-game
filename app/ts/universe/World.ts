import { Level } from './Level'

export class World {

    private levels: Level[]

    constructor(levelFile: any, settingsFile: any) {
        this.levels = []
        for (let level in levelFile.getData('levels')) {
            if (levelFile.getData('levels')[level] !== undefined) {
                this.levels.push(new Level(levelFile.getData('levels')[level], settingsFile))
            }
        }
    }

    /**
     * Get level by ID
     * @param   id      get level by id
     * @return          level instance
     */
    public getLevel(id: number): Level {
        if (this.levels[id] === undefined) {
            throw 'level with id: ' + id + ' does not exist'
        }
        return this.levels[id]
    }
}
