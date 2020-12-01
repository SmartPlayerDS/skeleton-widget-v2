export class Logger {
    static _instance = null;

    static get = () => {
        if (Logger._instance === null) {
            console.log('Logger get() Create new instance')
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    log = (message, messageType) => {
        const parent = window.top;

        if (this._isRunOnCMS()) {
            this._printMessage(message, messageType)
            return
        }

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

    _isRunOnCMS = () => {
        if (!window.location && !window.location.hostname) {
            return false
        }

        return window.location.hostname.indexOf('cms') === 0 || window.location.hostname.indexOf('api') === 0
    }

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