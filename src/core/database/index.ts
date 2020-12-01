import {DexieProvider} from "./dexieProvider";
import {DatabaseProvider} from "./databaseProvider";

class Database {
    private _database: DatabaseProvider

    constructor(databaseName: string) {
        this._database = new DexieProvider(databaseName)
    }

    declare = (version: string | number) => {
        this._database.declare(version)
    }

    open = (databaseName?: string): Promise<any> => {
        return this._database.open(databaseName)
    }

    someGetMethod = () => {
        return []
    }
}

export {Database}