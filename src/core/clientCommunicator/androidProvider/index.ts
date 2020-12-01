import {ClientProvider} from "../clientProvider";
import {Logger} from "../../logger/logger";

export class AndroidProvider extends ClientProvider {

    constructor() {
        super()
        this.initMethods()

        // @ts-ignore
        window.timeoutCallback = this.timeoutCallback.bind(this)
    }

    connect = () => {
        return new Promise(resolve => {
            Logger.get().log('AndroidProvider open()')
            resolve()
        })
    }

    initMethods = () => {
        const methods: any[] = [
            {name: 'openSecondaryUrl', method: 'openSecondaryUrl'},
            {name: 'historyUserBack', method: 'historyBack'},
            {name: 'gotoMain', method: 'gotoMain'},
            {name: 'reloadTimeoutUser', method: 'reloadTimeoutUser'},
            {name: 'getProductsApi', method: 'getProductsApi'},
            {name: 'getAuthorization', method: 'getAuthorization'},
            {name: 'setTimeoutUser', method: 'setTimeoutUser'},
            {name: 'setIframeSource', method: 'setIframeSource'},
            {name: 'getDeviceId'},
            {name: 'getDeviceHost'}
        ]

        for (let i = 0; i < methods.length; i++) {
            //@ts-ignore
            window[methods[i].name] = function (arg: any) {
                // @ts-ignore
                var self: any = this
                console.log('android interface method: ' + self.name)
                // @ts-ignore
                if (window.AndroidJsInterface) {
                    var res = null

                    if (self.method && window.AndroidJsInterface[self.method]) {
                        res = arg ? window.AndroidJsInterface[self.method](arg) : window.AndroidJsInterface[self.method]()
                    } else if (window.AndroidJsInterface[self.name]) {
                        res = arg ? window.AndroidJsInterface[self.name](arg) : window.AndroidJsInterface[self.name]()
                    }

                    return res
                }

            }.bind(methods[i])
        }
    }
    getSomeDataExample = (ids: any[]): Promise<any[]> =>  {
        return new Promise<any[]>(resolve => {
            resolve([])
        })
    }
    onBarcodeUpdated = (barcode: any): void => {
    }

    setTimeoutUser = (timeout: number): void => {
        window.setTimeoutUser(timeout)
    }

    timeoutCallback = () => {
        this.executeListeners("timeoutCallback")
    }

}