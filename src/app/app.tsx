import React from 'react'
import {AppMain} from "../components/appMain/appMain";
import {Logger} from "../core/logger/logger";
import {DATABASE_CONFIG} from "../core/database/databaseConfig";
import {Database} from "../core/database";
import {ClientCommunicator} from '../core/clientCommunicator';
import {getQueryStringValue} from '../widgetEditor/widgetEditorUtils';
import settingsIcon from './images/settings.svg'
import {WidgetEditor} from "../widgetEditor/widgetEditor";

import styles from './app.module.scss'
import {Auth} from '../core/models/Auth';
import {Messenger} from "../core/messenger/messenger";
import {WidgetOptionsEditor} from "../core/models/WidgetOptionsEditor";
import {Localisation} from "../core/localisation/locales";
import {translate, setLocale} from "../core/localisation";
import {MediaFileData} from '../core/models/MediaFileData';
import {isExist} from "../core/util/mainUtil";


interface IAppProps {
    requireDatabase?: boolean
    requireCommunicator?: boolean
}

interface IAppState {
    database?: Database,
    clientCommunicator?: ClientCommunicator
    auth?: Auth
    widgetOptionsEditor: WidgetOptionsEditor
}



class App extends React.Component<IAppProps, IAppState> {
    settingsIconRef: any
    private _frontendMessenger: Messenger
    private _isNeedDownloadMedia = true

    constructor(props: IAppProps) {
        super(props)

        this.state = {
            database: undefined,
            clientCommunicator: undefined,
            auth: undefined,
            widgetOptionsEditor: new WidgetOptionsEditor(window.skeleton_widget_v2)
        }

        this._frontendMessenger = new Messenger(this.messageListener)
    }

    componentDidMount() {
        this._initLocale()
        this.setCommunicator()
        this.setDatabase()
    }

    componentWillUnmount(): void {
        this._frontendMessenger.removeListener()
    }

    _setAuth = (data: any) => {
        Logger.get().log(`Setting authorization ${JSON.stringify(data)}`)

        const {token, host, deviceId} = data
        this.setState(state => ({
            ...state,
            auth: new Auth(token, host, deviceId)
        }))
    }

    private _initLocale = () => {
        this.onLocaleChanged(this.state.widgetOptionsEditor.data.settings.localisation)
    }

    messageListener = (message: any) => {
        Logger.get().log(`App#frontendMessageListener. ${message.data}`)

        let data: any = message.data
        if (typeof data !== 'string') {
            return
        }

        if (data.indexOf('selectMedia__') === 0) {
            data = data.replace('selectMedia__', '')
            const bufferData: MediaFileData = JSON.parse(data)
            this.state.widgetOptionsEditor.onMediaLoaded(bufferData)
        }

        if (data.indexOf('selectMediaWithFolders__') === 0) {
            data = data.replace('selectMediaWithFolders__', '')
            const bufferData: any = JSON.parse(data)
            this.state.widgetOptionsEditor.onMediaLoaded(bufferData)
        }

        if (data.includes('authorization')) {
            data = data.replace('authorization__', '')
            const parsed = JSON.parse(data)
            this.onMessageForApp('authorization', parsed)
        }

        if (data.includes('listenerDataUpdated')) {
            data = data.replace('listenerDataUpdated__', '')
            this.onMessageForApp('listenerDataUpdated', data)
        }

        if (data.includes('listenerDataDeleted')) {
            data = data.replace('listenerDataDeleted__', '')
            this.onMessageForApp('listenerDataDeleted', data)
        }

        if (data.includes('settings__')) {
            data = data.replace('settings__', '')
            data = JSON.parse(data)
            this._updateWidgetData(data)
        }
    }

    private _updateWidgetData = (data: any) => {
        const widgetOptionsEditor = this.state.widgetOptionsEditor

        this.setState(state => ({
            ...state,
            widgetOptionsEditor: new WidgetOptionsEditor(
                {
                    ...widgetOptionsEditor.data,
                    ...data
                },
                widgetOptionsEditor.inEditMode
            )
        }))
    }

    onWidgetOptionsUpdated = (updatedData: any) => {
        if (isExist(updatedData)) {
            this._updateWidgetData(updatedData)
        } else {
            // TODO: remove it after reworking widgetEditor.add method
            this.forceUpdate()
        }
    }

    onLocaleChanged = (locale: Localisation) => {
        setLocale(locale)
        this.forceUpdate()
    }

    onMessageForApp = (type: string, data: any) => {
        Logger.get().log(`App#onMessageForApp. type:${type}. data: ${JSON.stringify(data)}`)
        if (type === 'authorization') {
            this._setAuth(data)

            // this.getAllProducts();
        }

        if (type === 'closeModal') {

        }
    }

    setDatabase = () => {
        if (this.props.requireDatabase) {
            const database = new Database(DATABASE_CONFIG.NAME)

            database.declare(1)
            database.open()
                .then(() => {
                    Logger.get().log(`Database was opened`)
                    this.setState(state => ({
                            ...state,
                            database
                        })
                    )
                })
        }

    }

    setCommunicator = () => {
        if (this.props.requireCommunicator) {
            const clientCommunicator = new ClientCommunicator()

            if (clientCommunicator.provider) {
                clientCommunicator.connect()
                    .then(() => {
                        Logger.get().log(`Client communicator was opened`)
                        this.setState({
                            clientCommunicator
                        })
                    })
            }
        }
    }

    isServicesReady = () => {
        const {requireCommunicator, requireDatabase} = this.props

        if (requireCommunicator && !this._isCommunicatorInitialized()) {
            Logger.get().warn(`Client communicator required`)
            return false
        }

        if (requireDatabase && !this._isDatabaseInitialized()) {
            Logger.get().warn(`Database required`)
            return false
        }

        return true
    }

    _isDatabaseInitialized = () => {
        return !!this.state.database
    }

    _isCommunicatorInitialized = () => {
        const {clientCommunicator} = this.state
        return !!(clientCommunicator && clientCommunicator.provider)
    }

    render() {
        const isServicesReady = this.isServicesReady()

        if (!isServicesReady) {
            return null
        }

        return (
            <div>
                <AppContext.Provider value={{
                    onLocaleChanged: this.onLocaleChanged,
                }}>
                    <AppMain
                        clientProvider={this.state.clientCommunicator?.provider}
                        database={this.state.database}
                        auth={this.state.auth}
                        widgetOptions={this.state.widgetOptionsEditor.data}
                    />

                    {getQueryStringValue() &&
                    <div
                        className={styles.edit}
                    >
                        <WidgetEditor
                            path="settings"
                            isNeedDownloadMedia={this._isNeedDownloadMedia}
                            widgetOptionsEditor={this.state.widgetOptionsEditor}
                            onMessageForApp={this.onMessageForApp}
                            onWidgetOptionsUpdated={this.onWidgetOptionsUpdated}
                            ref={settingsIconRef => this.settingsIconRef = settingsIconRef}
                            fields={[
                                {
                                    name: 'film',
                                    label: translate('film'),
                                    type: 'select',
                                    selectOptions: [
                                        {value: 'id1', label: 'Star Wars'},
                                        {value: 'id2', label: 'The Lord of the Rings'},
                                        {value: 'id3', label: 'The Witcher'},
                                    ]
                                },
                                {
                                    name: 'music',
                                    label: translate('music'),
                                    type: 'multiselect',
                                    selectOptions: [
                                        {value: 'id1', label: 'Jazz'},
                                        {value: 'id2', label: 'Pop'},
                                        {value: 'id3', label: 'Classic'},
                                        {value: 'id4', label: 'Rock'},
                                        {value: 'id5', label: 'Techno'}
                                    ]
                                },
                                {
                                    label: translate('selectLanguage'),
                                    name: 'localisation',
                                    type: 'localisation'
                                },
                                {
                                    name: 'companyName',
                                    label: translate('companyName'),
                                },
                                {
                                    name: 'myPicture',
                                    label: translate('image'),
                                    type: 'image'
                                },
                                {
                                    name: 'birthday',
                                    type: 'date'
                                },
                                {
                                    name: 'titleColor',
                                    type: 'color',
                                },
                                {
                                    name: 'someNumber',
                                    type: 'number',
                                },
                                {
                                    name: 'collection',
                                    label: translate('images'),
                                    type: 'fileFolder'
                                },
                                {
                                    name: 'collection',
                                    label: translate('images'),
                                    type: 'fileFolder',
                                    advanced: {
                                        selection: "withFolders"
                                    }
                                },
                                {
                                    name: 'myVideo',
                                    label: translate('video'),
                                    type: 'video'
                                }
                            ]}
                        >
                            <img
                                src={settingsIcon}
                                className={styles.openEditorIcon}
                                onClick={(e) => {
                                    this.settingsIconRef.editStart(e);
                                }}
                                width={120}
                                height={120}
                                alt=""
                            />
                        </WidgetEditor>
                    </div>
                    }
                </AppContext.Provider>
            </div>

        )
    }
}

type AppContextType = {
    onLocaleChanged: (locale: Localisation) => void
}

export const AppContext = React.createContext<AppContextType>({
    onLocaleChanged: () => {

    }
})

export {App}
