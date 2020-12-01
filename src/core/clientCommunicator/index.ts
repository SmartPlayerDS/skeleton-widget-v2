import {QWebChannelProvider} from "./qWebChannelProvider";
import {ClientProvider} from "./clientProvider";
import {Logger} from "../logger/logger";
import {AndroidProvider} from "./androidProvider";
import {JSCoreProvider} from "./jsCoreProvider";
import {isExist} from "../util/mainUtil";
import {FakeProvider} from "./fakeProvider";

class ClientCommunicator {
    os: string
    provider: ClientProvider

    constructor() {
        this.os = this._getOSForClientProvider()
        this.provider = this._getProvider()
    }

    private _getOSForClientProvider = (): string => {
        // window, linux, android clients can rewrite to User Agent.
        if (isExist(window.DetectOS.OS)) {
            return window.DetectOS.OS
        }

        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'frontend'
        }

        if (this._isOnFrontendByAuthStorage() || window.location.hostname !== '') {
            return 'frontend'
        }

        return ''
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

    private _isOnFrontendByAuthStorage = (): boolean => {
        const auth = localStorage.getItem('authorization__user')
        return !!auth
    }

    connect = () => {
        return this.provider.connect()
    }
}

export {ClientCommunicator}