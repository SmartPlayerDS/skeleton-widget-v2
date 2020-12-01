import {ClientProvider} from "../clientProvider";

class FakeProvider extends ClientProvider {

    connect = () => {
        return new Promise(resolve => {
            resolve()
        })
    }

    getSomeDataExample = (ids: any[]): Promise<any[]> => {
        return new Promise((resolve) => {
            resolve()
        })
    }

    onBarcodeUpdated = (barcode: any) => {
    }

    setTimeoutUser = (timeout: number) => {
    }

    timeoutCallback = () => {
    }


}

export {FakeProvider}