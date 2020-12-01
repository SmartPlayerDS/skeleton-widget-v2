import {ClientProvider} from "../clientProvider";
import { Logger } from "../../logger/logger";

class QWebChannelProvider extends ClientProvider {
    constructor() {
        super()

        // EXAMPLE: platform specific subscription.
        // Qt-client calls window.onDownload(), window.listenerBarCodeUpdated(barcode)
        window.onDownload = this.onDownloadEvent.bind(this)
        window.listenerBarCodeUpdated = this.onBarcodeUpdated.bind(this)
        window.timeoutCallback = this.timeoutCallback.bind(this)
    }

    // EXAMPLE: simple method
    setTimeoutUser = (timeout: number) => {
        window.setTimeoutUser(timeout)
    }

    // EXAMPLE: send an event response to app code
    timeoutCallback = () => {
        this.executeListeners("timeoutCallback")
    }

    // EXAMPLE: send an event response to app code
    onDownloadEvent = () => {
        this.executeListeners("onDownload")
    }

    // EXAMPLE: simple method with a response in the callable method
    getSomeDataExample = (ids: any[]): Promise<any[]> => {
        return new Promise((resolve) => {
            resolve([])
        })
    }

    // EXAMPLE
    onBarcodeUpdated = (barcode: any) => {
        this.executeListeners("onBarcodeUpdated", barcode)
    }

    connect = () => {
        const src = 'qrc:///qwebchannel.js'

        return new Promise(resolve => {
            const s = document.createElement('script')
            s.setAttribute('src', src)
            document.head.insertBefore(s, document.getElementById('rootCss'))
            s.onload = () => {
                Logger.get().log('QWebChannelProvider open() ONLOAD')
                this.initMethods()
                resolve()
            }
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
                console.log(self.name)
                // @ts-ignore
                new window.QWebChannel(
                    // @ts-ignore
                    window.qt.webChannelTransport,
                    function (channel: any) {
                        var obj = channel.objects.smartPlayerQmlObject
                        var res = null

                        if (self.method && obj[self.method]) {
                            res = arg ? obj[self.method](arg) : obj[self.method]()
                        } else if (obj[self.name]) {
                            res = arg ? obj[self.name](arg) : obj[self.name]()
                        }

                        return res
                    }
                )
            }.bind(methods[i])
        }
    }
}

export {QWebChannelProvider}