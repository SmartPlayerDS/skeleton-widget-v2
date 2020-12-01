import {CommunicatorListener, CommunicatorListenerType} from "../models/CommunicatorListener";

export abstract class ClientProvider {
    // methods with Promise or Callback don't need listeners
    abstract connect: () => Promise<any>
    abstract getSomeDataExample: (ids: any[]) => Promise<any[]>
    abstract setTimeoutUser: (timeout: number) => void

    // listeners for events like signals from qwebchannel, postMessages from js-clients
    // in other words - those methods that we did not initiate manually
    abstract onBarcodeUpdated: (barcode: any) => void
    abstract timeoutCallback: () => void

    private _listeners: CommunicatorListener[] = []

    setListeners = (listeners: CommunicatorListener[]) => {
        this._listeners.push(...listeners)
    }

    private _getListeners = (listenerType: CommunicatorListenerType): any[] => {
        return this._listeners
            .filter(listener => listener.listenerType === listenerType)
    }

    private _invokeListeners = (listeners: CommunicatorListener[], params?: any) => {
        listeners.forEach(listener => {
            if (params) {
                listener.listenerMethod(params)
                return
            }
            listener.listenerMethod()
        })
    }

    executeListeners = (listenerType: CommunicatorListenerType, params?: any) => {
        const listeners = this._getListeners(listenerType)
        this._invokeListeners(listeners, params)
    }

    deleteListeners = (listenerType: CommunicatorListenerType) => {
        this._listeners = this._listeners.filter(listener => listener.listenerType !== listenerType)
    }

    clearListeners = () => {
        this._listeners = []
    }
}