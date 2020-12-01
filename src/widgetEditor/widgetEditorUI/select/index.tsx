import React, {useState, useEffect, FunctionComponent} from 'react'
import {isExist} from "../../../core/util/mainUtil";

import style from './select.module.scss'
import {translate} from "../../../core/localisation";


interface ISelectComponent {
    options: any[]
    value: any
    onChange: any
    valueName?: string
    labelName?:string
}

const Select: FunctionComponent<ISelectComponent> = ({ options, value, onChange, valueName = 'value', labelName = 'label' }) => {
    const DEFAULT_VALUE = translate('defaultValue');
    const INIT_LABEL = translate('selectValue');

    const [isSelectActive, setSelectStatus] = useState(false);

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

    const changeOptionStatus = (val: any) => {
        let option = options.find((option: any) => getOptionValueByName(option, valueName) === val);
        setSelectStatus(false);
        onChange(option)
    }

    const handleClick = () => {
        if (!isSelectActive) {
            setSelectStatus(true);
            return;
        } 

        setSelectStatus(false);
    }

    const handleWindowClick = (e: any) => {
        let path = e.path;

        if (isExist(e.path)) {
            let isFindSelectWrapperClass = false;
            
            path.forEach((pathElement: any) => {
                let className = pathElement.className;

                if (isExist(className) && className.indexOf('selectWrapper') >= 0) {
                    isFindSelectWrapperClass = true;
                } 
            })

            if (!isFindSelectWrapperClass) {
                setSelectStatus(false);
            }
        }
    }

    const getTitle = () => {
        let findedOption = options.find(option => getOptionValueByName(option, valueName) === value);

        return isExist(findedOption) ? getOptionValueByName(findedOption, labelName) : INIT_LABEL;
    }

    useEffect(() => {
        window.addEventListener('click', handleWindowClick)
        return () => {
            window.removeEventListener('click', handleWindowClick)
        }
    }, [])

    const additionStyles = isSelectActive ? style.selectTitleActive : style.selectTitleDisable;

    return (
        <div className={`${style.selectWrapper} selectWrapper`}>
            <div className={style.select}>
                <div className={`${style.selectTitle} ${additionStyles}`} onClick={handleClick}>
                    { getTitle() }
                </div>
                {
                    isSelectActive ? 
                    (
                        <div className={style.selectOptionsWrapper}>
                            <div className={style.selectOptions}>
                                {
                                    options
                                        .filter(option => {
                                            return getOptionValueByName(option, valueName) !== DEFAULT_VALUE
                                        })
                                        .map((option, index) => {
                                            return (
                                                <div
                                                    key={getOptionValueByName(option, valueName)}
                                                    className={style.selectOption}
                                                    onClick={() => changeOptionStatus(getOptionValueByName(option, valueName))}
                                                >
                                                    {getOptionValueByName(option, labelName)}
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    ): null
                }
            </div>
        </div>
    )
}

export { Select }