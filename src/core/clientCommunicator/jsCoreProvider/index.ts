import {ClientProvider} from "../clientProvider";
import {Messenger} from "../../messenger/messenger";

export class JSCoreProvider extends ClientProvider {
    private _jsCoreMessenger: any

    constructor() {
        super()
        this.listenPostMessages()
    }

    connect = (): Promise<any> => {
        return new Promise<any>(resolve => {
            resolve()
        })
    }

    listenPostMessages = () => {
        this._jsCoreMessenger = new Messenger(this.messageListener)
    }

    messageListener = (message: any) => {
        console.log(`********** JSCoreProvider messageListener ${message.data}`)

        let data: any = message.data
        if (typeof data !== 'string') {
            return
        }

        if (data.includes('jscore_timeout__')) {
            // EXAMPLE: get data from answer.
            // data = data.replace('timeout__', '')
            // const parsed = JSON.parse(data)
            this.timeoutCallback()
        }

        if (data.includes('listenerDataUpdated')) {
        }

        if (data.includes('listenerDataDeleted')) {
        }
    }

    getSomeDataExample = (): Promise<any> => {
        return new Promise<any>(resolve => {

        })
    }

    onBarcodeUpdated = (barcode: any) => {

    }

    setTimeoutUser = (timeout: number) => {
        const params = {
            timeout
        }
        this._sendToJSCore('jscoreSpecificMethod', params)
    }

    timeoutCallback = () => {
        this.executeListeners("timeoutCallback")
    }

    private _sendToJSCore = (jsCoreMethodName: string, params: any) => {
        const parent = window.top;
        const message = this._makeMessageForJSCoreListener(jsCoreMethodName, params)

        if (this._canDevicePrintMessage(parent)) {
            parent.postMessage(message, "*");
        }
    }

    private _canDevicePrintMessage = (parent: any) => {
        return parent && parent.useDeviceForWidget
    }

    private _makeMessageForJSCoreListener = (jsCoreMethodName: string, params: any) => {
        const jsonParams = JSON.stringify(params)
        return `jscore_${jsCoreMethodName}_${jsonParams}`
    }
}