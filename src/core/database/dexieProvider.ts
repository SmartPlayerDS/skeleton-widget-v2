import Dexie from 'dexie/dist/dexie.js'
import {TABLES} from './tables'
import {DatabaseProvider} from "./databaseProvider";

class DexieProvider implements DatabaseProvider {
    database: Dexie

    constructor(databaseName: string) {
        this.database = new Dexie(databaseName)
    }

    declare = (version: string | number) => {
        const numberVersion = Number(version)
        this.database.version(numberVersion).stores({
            [TABLES.TABLE_NAME]: 'id, data'
        });
    }

    open = (databaseName?: string) => {
        return this.database.open()
    }
}

export {DexieProvider}