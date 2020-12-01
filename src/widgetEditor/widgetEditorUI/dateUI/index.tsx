import React, {FunctionComponent} from 'react';
import moment from "moment";
import ReactDateTime from "react-datetime";
import {ChangeItemFunc} from "../../widgetEditor-types";
import {ICommonUI} from "../widgetEditorUI-types";

import './dateUI.css'
import {getLocale} from "../../../core/localisation";


interface IDateUI extends ICommonUI {
    onChangeItem: ChangeItemFunc
}

const DateUI: FunctionComponent<IDateUI> = ({field, editableItem, onChangeItem}) => {
    const fieldName = field.name

    return (
        <ReactDateTime
            className={"dateTimePicker"} // for .dateTimePicker .rdtPicker. SCSS module doesnt work
            inputProps={{
                style: {
                    display: 'none',
                    position: 'relative'
                }
            }}
            value={moment(editableItem[fieldName])}
            onChange={(e) => {
                const value = moment(e)
                const event = {
                    target: {
                        value
                    }
                }

                onChangeItem(event, fieldName)
            }}
            locale={getLocale()}
            open
        />
    );
};

export {DateUI}
