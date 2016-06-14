import { DataFile } from './main/DataFile'

let settings = new DataFile('../res/settings.json', _ => {
    console.log(settings.getData())
})