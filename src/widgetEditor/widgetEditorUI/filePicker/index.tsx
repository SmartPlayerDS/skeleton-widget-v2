import React, {FunctionComponent} from 'react';
import {convertValueForEditorFormat, isExist} from "../../../core/util/mainUtil";
import {ChangeItemFunc, OpenSelectMediaFunc} from "../../widgetEditor-types";
import {ICommonUI} from "../widgetEditorUI-types";

import styles from './filePicker.module.scss'
import {translate} from "../../../core/localisation";


interface IFilePickerComponent extends ICommonUI {
    onOpenSelectMediaAdminScreen: OpenSelectMediaFunc
    onChangeItem: ChangeItemFunc
}

const FilePicker: FunctionComponent<IFilePickerComponent> = ({field, editableItem, onOpenSelectMediaAdminScreen, onChangeItem}) => {
    const fieldName = field.name

    const openFolder = () => {
        let selection;
        if (field.advanced && field.advanced.selection) {
            selection = field.advanced.selection
        }
        onOpenSelectMediaAdminScreen(fieldName, {selection: selection})
    }

    return (
        <div>
            <div
                className={styles.button}
                onClick={openFolder}
            >
                {translate('selectFolder')}
            </div>
            <button
                type={'button'}
                disabled={!isExist(editableItem[fieldName])}
                className={styles.button}
                onClick={(e) => {
                    e.stopPropagation()
                    const value = convertValueForEditorFormat([])
                    onChangeItem(value, fieldName)
                }}
            >
                {translate('delete')}
            </button>
            <div className={styles.sublabel}>
                {translate('selected')}{' '}
                {Array.isArray(editableItem[fieldName])
                    ? editableItem[fieldName].length
                    : '1'}{' '}
                {translate('media')}
            </div>
        </div>
    );
};

export {FilePicker}
