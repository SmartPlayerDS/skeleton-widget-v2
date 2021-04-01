import { getEnviromentOS } from "../util/mainUtil";

export class Logger {
    static _instance = null;
    _os = null

    static get = () => {
        if (Logger._instance === null) {
            console.log('Logger get() Create new instance')
            const os = getEnviromentOS()
            Logger._instance = new Logger(os);
        }
        return Logger._instance;
    }

    constructor(os) {
        this._os = os;
    }

    log = (message, messageType) => {
        if (this._isRunOnFrontend(this._os)) {
            this._printMessage(message, messageType)
            return
        }

        const parent = window.top;

        if (!this._canDevicePrintMessage(parent)) {
            this._printMessage(message, messageType)
            return
        }

        parent.postMessage(message, "*");
    }

    _printMessage = (message, messageType) => {
        switch (messageType) {
            case MESSAGE_TYPE.error:
                console.error(message)
                return

            case MESSAGE_TYPE.warning:
                console.warn(message)
                return

            default:
                console.log(message)
                return
        }
    }

    _canDevicePrintMessage = (parent) => {
        return parent && parent.useDeviceForWidget
    }

    _isRunOnFrontend = (os) => os === 'frontend'

    err = (message) => {
        Logger.get().log(`Widget error: ${message}`, MESSAGE_TYPE.error);
    }

    warn = (message) => {
        Logger.get().log(`Widget warning: ${message}`, MESSAGE_TYPE.warning)
    }
}

const MESSAGE_TYPE = {
    warning: 'warning',
    error: 'error'
}