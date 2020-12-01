export interface ModalProps {
    open: boolean
    onClose: () => void
    showCloseIcon: boolean
    className: string
    modalControls?: any[]
}
