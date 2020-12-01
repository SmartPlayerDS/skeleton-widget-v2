import React, {FunctionComponent, useEffect} from 'react';
import {translate} from "../../core/localisation";
import {Auth} from "../../core/models/Auth";
import {ClientProvider} from "../../core/clientCommunicator/clientProvider";
import {DatabaseProvider} from "../../core/database/databaseProvider";
import { printError } from '../../core/util/mainUtil';
import {Logger} from "../../core/logger/logger";

interface IAppMainComponent {
    clientProvider?: ClientProvider
    database?: DatabaseProvider
    auth?: Auth
    widgetOptions?: any
}

const AppMain: FunctionComponent<IAppMainComponent> = ({clientProvider, database, auth, widgetOptions}) => {

    useEffect(() => {
        const subscribeToEvents = () => {
            if (clientProvider) {
                clientProvider.setListeners([
                    {listenerType: "onDownload", listenerMethod: onDownload},
                    {listenerType: "onSomeEvent", listenerMethod: onSomeEventFromClients},
                    {listenerType: "onBarcodeUpdated", listenerMethod: onBarcodeUpdated},
                    {listenerType: "timeoutCallback", listenerMethod: onTimeoutCallback}
                ])
            }

        }
        subscribeToEvents()

        return () => {
            if (clientProvider) {
                clientProvider.clearListeners()
            }
        }
    }, [clientProvider])

    if (!clientProvider) {
        return null
    }


    // EXAMPLE: using events listeners from clients
    const onDownload = ({file, message, status}: any) => {
        console.log(`AppMain#onDownload. Some result:`, file, message, status)
    }

    const onSomeEventFromClients = (someResults: any) => {
        console.log(`AppMain#onSomeEventFromClients. Some result: ${someResults}`)
    }

    // EXAMPLE: using qt event
    const onBarcodeUpdated = (barcode: any) => {
        Logger.get().log('AppMain#onBarcodeUpdated. barcode', barcode)
    }

    const onTimeoutCallback = () => {
        Logger.get().log('AppMain#onTimeoutCallback. Test')
    }

    // EXAMPLE: using client method which can answer by promise
    clientProvider.getSomeDataExample([])
        .then(response => {
        })
        .catch(err => {
            printError(err.message)
        })

    clientProvider.setTimeoutUser(5000)

    return (
        <div>
            {translate('helloWorld')}
        </div>
    );
};

export {AppMain}
