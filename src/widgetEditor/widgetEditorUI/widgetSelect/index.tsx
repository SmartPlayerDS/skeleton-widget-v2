import React, {FunctionComponent} from 'react';
import {ICommonUI} from "../widgetEditorUI-types";
import {ChangeItemFunc} from "../../widgetEditor-types";
import { Select } from '../select';
import {convertValueForEditorFormat} from "../../../core/util/mainUtil";

interface IWidgetSelectComponent extends ICommonUI {
    onChangeItem: ChangeItemFunc
}

const WidgetSelect: FunctionComponent<IWidgetSelectComponent> = ({field, editableItem, onChangeItem}) => {

    const changeSelection = (option: any) => {
        onChangeItem(convertValueForEditorFormat(option.value), field.name)
    }

    const options = field.selectOptions || []

    return (
        <div>
            <Select
                options={options}
                value={editableItem[field.name]}
                onChange={changeSelection}
            />
        </div>
    );
};

export {WidgetSelect}
