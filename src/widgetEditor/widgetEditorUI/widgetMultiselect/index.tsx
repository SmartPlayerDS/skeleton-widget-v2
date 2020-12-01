import React, {FunctionComponent} from 'react';
import {ICommonUI} from "../widgetEditorUI-types";
import {ChangeItemFunc} from "../../widgetEditor-types";
import { Multiselect } from '../multiselect';
import {convertValueForEditorFormat} from "../../../core/util/mainUtil";

interface IWidgetMultiselectComponent extends ICommonUI {
    onChangeItem: ChangeItemFunc
}

const WidgetMultiselect: FunctionComponent<IWidgetMultiselectComponent> = ({field, editableItem, onChangeItem}) => {

    const changeSelection = (options: any[]) => {
        onChangeItem(convertValueForEditorFormat(options), field.name)
    }

    const options = field.selectOptions || []

    return (
        <div>
            <Multiselect
                options={options}
                values={editableItem[field.name]}
                onChange={changeSelection}
            />
        </div>
    );
};

export {WidgetMultiselect}
