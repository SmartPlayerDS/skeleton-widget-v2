import React, {FunctionComponent} from 'react';
import {ChangeItemFunc} from "../../widgetEditor-types";
import {ICommonUI} from "../widgetEditorUI-types";

interface ICheckBoxComponent extends ICommonUI {
    onChangeItem: ChangeItemFunc
}

const CheckBox: FunctionComponent<ICheckBoxComponent> = ({field, editableItem, onChangeItem}) => {
    const fieldName = field.name

    return (
        <input
            type="checkbox"
            id={fieldName}
            checked={editableItem[fieldName]}
            onChange={() => {
                const checkboxData = {
                    target: {
                        value: !editableItem[fieldName]
                    }
                }

                onChangeItem(checkboxData, fieldName)
            }}
        />
    );
};

export {CheckBox}
