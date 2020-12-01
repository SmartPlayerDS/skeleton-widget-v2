import { Field } from "../../core/models/Field";

export interface ICommonUI {
    field: Field
    editableItem: any
    className?: 'string'
    style?: object
}