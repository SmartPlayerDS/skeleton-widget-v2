import React, {FunctionComponent} from 'react';
import {ChromePicker} from "react-color";
import {ChangeColorFunc} from "../../widgetEditor-types";
import {ICommonUI} from "../widgetEditorUI-types";

interface IColorPickerComponent extends ICommonUI {
    onChangeColor: ChangeColorFunc
}

const ColorPicker: FunctionComponent<IColorPickerComponent> = ({field, editableItem, onChangeColor}) => {
    const fieldName = field.name

    return (
        <div style={{ marginBottom: 10 }}>
            <ChromePicker
                color={editableItem[fieldName]}
                disableAlpha
                onChangeComplete={(e) =>
                    onChangeColor(e, fieldName)
                }
            />
        </div>
    );
};

export {ColorPicker}
