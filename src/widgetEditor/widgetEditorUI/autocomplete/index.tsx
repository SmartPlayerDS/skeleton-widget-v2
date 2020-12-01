import React, {FC, useCallback, useEffect, useState} from 'react';
import Autosuggest, {InputProps} from 'react-autosuggest';
import {ICommonUI} from "../widgetEditorUI-types";
import {ChangeItemFunc} from "../../widgetEditor-types";
import styles from './autocomplete.module.scss'
import debounce from 'lodash/debounce'
import {convertValueForEditorFormat} from "../../../core/util/mainUtil";

interface IAutocompleteComponent extends ICommonUI {
    onChangeItem: ChangeItemFunc
}

const Autocomplete: FC<IAutocompleteComponent> = ({field, editableItem, onChangeItem}) => {
    const [items, setItems] = useState<any[]>([])
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [value, setValue] = useState<string>(editableItem[field.name])
    const [suggestionValue, setSuggestionValue] = useState('')

    useEffect(() => {
        if (field.advanced && field.advanced.allItems) {
            setItems(field.advanced.allItems)
        }
    }, [field])

    const onChange = (e: any, params: any) => {
        let val = (e.target && e.target.value) ? e.target.value : params.newValue
        onChangeItem(convertValueForEditorFormat(val), field.name)
        setValue(val)
    }

    const getSuggestions = (value: any) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength === 0) {
            return []
        }

        return items.filter(item => item.toLowerCase().slice(0, inputLength) === inputValue)
    };

    const onSuggestionsFetchRequested = ({value}: {value: string, reason: string}) => {
        setSuggestions(getSuggestions(value))
    };

    const getSuggestionValue = (suggestion: any) => {
        setSuggestionValue(suggestion)
        return suggestion
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const renderSuggestion = (suggestion: any) => {
        return (
            <div>
                {suggestion}
            </div>
        )
    }

    const _getPlaceholder = () => {
        if (field.advanced && field.advanced.placeholder) {
            return field.advanced.placeholder
        }
        return ''
    }

    const inputProps: InputProps<string> = {
        value: value ? value : suggestionValue,
        onChange: onChange,
        placeholder: _getPlaceholder()
    }

    const onSuggestionsFetchRequestedDebounce = useCallback(
        debounce((e: {value: string, reason: string}) => {
            onSuggestionsFetchRequested(e)
        }, 1500), [items]);

    return (
        <Autosuggest
            theme={styles}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequestedDebounce}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            inputProps={inputProps}
            renderSuggestion={renderSuggestion}
        />
    );
};

export {Autocomplete}
