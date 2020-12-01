import React, {FunctionComponent, useContext} from 'react';
import {Select} from "../select";
import {AppContext} from "../../../app/app";
import {Localisation} from "../../../core/localisation/locales";
import {ICommonUI} from "../widgetEditorUI-types";
import {ChangeItemFunc} from "../../widgetEditor-types";
import {convertValueForEditorFormat} from "../../../core/util/mainUtil";

interface IWidgetLocaleComponent extends ICommonUI {
    onChangeItem: ChangeItemFunc
}

type SelectOption = {
    value: Localisation
    label: string
}

const options: SelectOption[] = [
    {value: 'en', label: 'English'},
    {value: 'ru', label: 'Русский'},
]

const WidgetLocale: FunctionComponent<IWidgetLocaleComponent> = ({field, editableItem, onChangeItem}) => {
    const {onLocaleChanged} = useContext(AppContext)
    const value = editableItem[field.name]

    const changeLocalisation = (option: SelectOption) => {
        onChangeItem(convertValueForEditorFormat(option.value), field.name)
        onLocaleChanged(option.value)
    }

    return (
        <div>
            <Select
                options={options}
                value={value}
                onChange={changeLocalisation}
            />
        </div>
    );
};

export {WidgetLocale}
