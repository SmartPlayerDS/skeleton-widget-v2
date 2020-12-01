import React, {FunctionComponent} from 'react';
import {ChangeItemFunc, OpenSelectMediaFunc} from "../../widgetEditor-types";
import {ICommonUI} from "../widgetEditorUI-types";

import styles from './imagePicker.module.scss'
import {translate} from "../../../core/localisation";


interface IImagePicker extends ICommonUI {
    onOpenSelectMediaAdminScreen: OpenSelectMediaFunc
    onChangeItem: ChangeItemFunc

}

const ImagePicker: FunctionComponent<IImagePicker> = ({field, editableItem, onOpenSelectMediaAdminScreen, onChangeItem}) => {
    const fieldName = field.name

    const _getImageSrc = (imageList: any) => {
        if (!imageList || !imageList[0] || !imageList[0].src) return null;

        return imageList[0].src;
    }

    if (editableItem[fieldName]) {
        return (
            <div>
                <img
                    className={styles.image}
                    width={'60%'}
                    alt={''}
                    src={_getImageSrc(editableItem[fieldName])}
                    onClick={() => onOpenSelectMediaAdminScreen(fieldName)}
                />
                <div
                    className={styles.button}
                    onClick={(e) => {
                        e.stopPropagation()
                        const value = {
                            target: {
                                value: ''
                            }
                        }

                        onChangeItem(value, fieldName)
                    }}
                >
                    {translate('delete')}
                </div>
            </div>
        )
    } else {
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    onOpenSelectMediaAdminScreen(fieldName)
                }}
                className={styles.button}
            >
                {translate('selectImage')}
            </div>
        )
    }
};

export {ImagePicker}
