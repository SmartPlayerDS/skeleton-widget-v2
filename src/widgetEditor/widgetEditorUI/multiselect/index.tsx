import React, {FunctionComponent} from 'react'
import style from './multiselect.module.scss'
import {isExist} from "../../../core/util/mainUtil";

interface IMultiselectComponent {
    options: any[]
    values: any
    onChange: any
    valueName?: string
    labelName?:string
}

const Multiselect: FunctionComponent<IMultiselectComponent> = ({ options, values, onChange, valueName = 'value', labelName = 'label' }) => {
    const DEFAULT_VALUE = 'Значение по-умолчанию';

    const getOptionValueByName = (option: any, value: any) => {
        let valueChunks = value.split('.');
        let name;

        for (let i = 0; i < valueChunks.length; i ++) {
            let optionName: any = isExist(name) ? name[valueChunks[i]]: option[valueChunks[i]];

            if (isExist(optionName)) {
                name = optionName;
            } else {
                name = DEFAULT_VALUE;
                break;
            }
        }

        return name;
    }

    const selectedOptions = () => {
        return isExist(values) && Array.isArray(values) ? values : [];
    }

    const deleteOption = (chosenOption: any) => {
        let updatedOptions = selectedOptions().filter(option => option !== chosenOption, valueName);
        onChange(updatedOptions);
    }

    const addOption = (chosenOption: any) => {
        let updatedOptions = selectedOptions().concat(chosenOption);
        onChange(updatedOptions);
    }

    const changeOptionStatus = (value: any) => {
        let chosenOption = selectedOptions().find((option) => option === value);

        if (isExist(chosenOption)) {
            deleteOption(value)
        } else {
            addOption(value);
        }
    }

    const isSelected = (value: any) => {
        let findedOption = selectedOptions().find(option => option === value);
        return isExist(findedOption);
    }

    return (
        <div className={style.multiselectWrapper}>
            <div className={style.multiselect}>
                <div className={style.multiselectOptionsWrapper}>
                    <div className={style.multiselectOptions}>
                        {
                            options
                                .filter(option => {
                                    return getOptionValueByName(option, valueName) !== DEFAULT_VALUE
                                })
                                .map((option, index) => {
                                    let additionStyles = isSelected(getOptionValueByName(option, valueName)) ? style.multiselectOptionActive : style.multiselectOptionDisable;

                                    return <div key={getOptionValueByName(option, valueName)} className={`${style.multiselectOption} ${additionStyles}`} onClick={() => changeOptionStatus(getOptionValueByName(option, valueName))}>
                                        {getOptionValueByName(option, labelName)}
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Multiselect }