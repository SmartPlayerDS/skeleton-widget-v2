import {QWebChannelProvider} from "./qWebChannelProvider";
import {ClientProvider} from "./clientProvider";
import {Logger} from "../logger/logger";
import {AndroidProvider} from "./androidProvider";
import {JSCoreProvider} from "./jsCoreProvider";
import {getEnviromentOS} from "../util/mainUtil";
import {FakeProvider} from "./fakeProvider";

class ClientCommunicator {
    os: string
    provider: ClientProvider

    constructor() {
        this.os = getEnviromentOS()
        this.provider = this._getProvider()
    }

    private _getProvider = (): ClientProvider => {
        Logger.get().log(`ClientCommunicator os: ${this.os}`)

        if (this.os === 'windows' || this.os === 'linux') {
            return new QWebChannelProvider()
        }

        if (this.os === 'android') {
            return new AndroidProvider()
        }

        if (this.os === 'frontend') {
            return new FakeProvider()
        }

        return new JSCoreProvider()
    }

    connect = () => {
        return this.provider.connect()
    }
}

export {ClientCommunicator}