import {WidgetOptionsEditor} from "../core/models/WidgetOptionsEditor";
import { Field } from "../core/models/Field";

export type TSelection = 'default' | 'withFolders'
export type TSelectMediaOptions = {
    selection: TSelection
}

export type ChangeItemFunc = (e: any, fieldName: string) => void
export type ChangeColorFunc = (color: any, fieldName: string) => void
export type OpenSelectMediaFunc = (fieldName: string, options?: TSelectMediaOptions) => void

export interface WidgetEditorProps {
    path: string
    fields: Field[]
    isNeedDownloadMedia: boolean
    widgetOptionsEditor: WidgetOptionsEditor
    onWidgetOptionsUpdated: (updatedData?: any) => void
    onMessageForApp: (type: string, data?: any) => void

    open?: string
    tag?: string
    enabled?: boolean,

    controlsStyle?: any | object

    onDelete: () => void
    onUpdate: () => void
    onClose: () => void
    onOpen: () => void

    className?: string
    style?: any
}

export interface WidgetEditorState {
    showModal: boolean
    modalType: string | undefined
    item: any
}


export const widgetEditorDefaultProps = {
    tag: 'div',
    onlyEditIcon: false,
    enabled: true,
    controlsStyle: {
        visibility: 'hidden'
    },
    onDelete: () => {},
    onUpdate: () => {},
    onClose: () => {},
    onOpen: () => {}
}