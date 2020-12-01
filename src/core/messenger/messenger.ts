import {
    crossPlatformAddEvent,
    crossPlatformMessageEvent,
    crossPlatformRemoveEvent
} from "../../widgetEditor/eventer/eventer"

export class Messenger {
    private _eventer: any
    private _listener: any

    constructor(listener: any) {
        this._eventer = this._createEventer(listener)
    }

    private _createEventer = (listener: any) => {
        // postMessageEventer - cross platform for window.addEventListener("message", receiveMessage, false);
        this._listener = listener;

        crossPlatformAddEvent(
            crossPlatformMessageEvent,
            listener,
            false
        )
    }

    removeListener = () => {
        crossPlatformRemoveEvent(
            crossPlatformMessageEvent,
            this._listener,
            false
        )

        this._listener = undefined
    }
}
