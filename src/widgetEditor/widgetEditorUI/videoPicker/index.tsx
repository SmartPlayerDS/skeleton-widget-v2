import React, {FunctionComponent} from 'react';
import {ChangeItemFunc, OpenSelectMediaFunc} from '../../widgetEditor-types';
import {ICommonUI} from "../widgetEditorUI-types";

import styles from './videoPicker.module.scss'
import {translate} from "../../../core/localisation";
import {convertValueForEditorFormat, isNotEmptyArray} from "../../../core/util/mainUtil";


interface IVideoPicker  extends ICommonUI {
    onOpenSelectMediaAdminScreen: OpenSelectMediaFunc
    onChangeItem: ChangeItemFunc
}

const VideoPicker: FunctionComponent<IVideoPicker> = ({field, editableItem, onOpenSelectMediaAdminScreen, onChangeItem}) => {
    const fieldName = field.name
    let video: any = ''

    if (isNotEmptyArray(editableItem[fieldName])) {
        video = editableItem[fieldName][0]
    }


    const _isVideoExist = (): boolean => {
        return !!video
    }

    if (_isVideoExist()) {
        return (
            <div
                style={{
                    width: '100%'
                }}
            >
                <video
                    controls={true}
                    autoPlay={false}
                    style={{
                        display: 'inline-block'
                    }}
                    width={'60%'}
                    src={video.src}
                />

                <div
                    style={{
                        marginTop: 10,
                        marginBottom: 25
                    }}
                >
                    <div style={{ width: '100%' }}>
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                onOpenSelectMediaAdminScreen(fieldName)
                            }}
                            className={styles.button}
                        >
                            {translate('selectVideo')}
                        </div>
                        <div
                            className={styles.button}
                            onClick={(e) => {
                                e.stopPropagation()

                                const value = convertValueForEditorFormat('')
                                onChangeItem(value, fieldName)
                            }}
                        >
                            {translate('delete')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                onOpenSelectMediaAdminScreen(fieldName)
            }}
            className={styles.button}
        >
            {translate('selectVideo')}
        </div>
    )

};

export {VideoPicker}
