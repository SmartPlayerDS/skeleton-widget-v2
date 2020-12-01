import {MediaFileData} from "./MediaFileData";
import getValue from "../../widgetEditor/widgetEditorUtils";

export type WidgetOptionsKey = 'simple' | 'list' | ''

export interface IWidgetOptions {
    data: any
    key: WidgetOptionsKey
    inEditMode: boolean
}


export class WidgetOptionsEditor implements IWidgetOptions {
    data: any;
    inEditMode = false
    private _key: WidgetOptionsKey = ''

    private _onMediaLoadedCallback: any


    constructor(data: any, inEditMode = false) {
        this.data = data
        this.inEditMode = inEditMode
    }

    set key(value: WidgetOptionsKey) {
        this._key = value
    }

    waitDownloadingFromAdminPanel = (onMediaLoadedCallback: any) => {
        this._onMediaLoadedCallback = onMediaLoadedCallback
    }

    onMediaLoaded = (mediaData: MediaFileData) => {
        this._onMediaLoadedCallback(mediaData)
    }

    getDataByPath = (settingPath?: string) => {
        if (settingPath) {
            let fullPath: string =  `${settingPath}`
            return getValue(this.data, fullPath)
        } else {
            return this.data
        }
    }
}