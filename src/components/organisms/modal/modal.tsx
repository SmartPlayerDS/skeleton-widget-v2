import React, {FunctionComponent} from 'react';
import { ModalProps } from './modal-types';

import styles from './modal.module.scss'

const Modal: FunctionComponent<ModalProps> = ({open, children, onClose, showCloseIcon, modalControls}) => {
    if (!open) {
        return null
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                {showCloseIcon &&
                    <div className={styles.modalClose} onClick={onClose}>×</div>
                }

                <div className={styles.modalContent}>
                    {children}
                </div>

                <div className={styles.modalControls}>
                    {modalControls}
                </div>
            </div>
        </div>
    );
};

export {Modal}
