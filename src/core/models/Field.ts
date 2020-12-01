import { WidgetControlType } from "./WidgetControlType";

export type Field = {
    name: string
    label?: string
    type?: WidgetControlType

    selectOptions?: any[]
    advanced?: any
}