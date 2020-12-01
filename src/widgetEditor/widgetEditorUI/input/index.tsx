import React, {FunctionComponent} from 'react';
import {ChangeItemFunc} from "../../widgetEditor-types";
import {ICommonUI} from "../widgetEditorUI-types";

import styles from './input.module.scss'


interface IInputComponent extends ICommonUI {
    type?: string
    onChangeItem: ChangeItemFunc
}

const Input: FunctionComponent<IInputComponent> = ({field, editableItem, onChangeItem, type = 'text'}) => {
    const fieldName = field.name
    let disabled = false
    if (field.advanced) {
        disabled = !!field.advanced.disabled
    }

    return (
        <input
            id={fieldName}
            type={type}
            value={editableItem[fieldName]}
            onChange={(e) => onChangeItem(e, fieldName)}
            className={styles.input}
            disabled={disabled}
        />
    );
};

export {Input}
