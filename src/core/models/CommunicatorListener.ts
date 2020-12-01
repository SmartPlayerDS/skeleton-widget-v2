export type CommunicatorListenerType = 'onDownload' | 'onSomeEvent' | 'onBarcodeUpdated' | 'timeoutCallback'

export type CommunicatorListener = {
    listenerType: CommunicatorListenerType
    listenerMethod: any
}