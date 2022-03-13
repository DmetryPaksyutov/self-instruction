import React, {useEffect, useRef } from 'react'
import {useReducerAsync} from 'use-reducer-async'
import {
    initialTextInputState,
    TextInputReducer,
    TextInputAsyncActions,
    TextInputActions
} from './TextInputReduser'

import st from './TextInput.module.scss'
import gSt from '../InfoProfile.module.scss'
import loadingGef from '../../../../img/loading.gif'


interface IProps {
    initialValue : string | number | null,
    api : any,
    update : (value : any) => void,
}
export const TextInput : React.FC<IProps> = ({ initialValue, api, update}) => {

    const [state, dispatch] = useReducerAsync(TextInputReducer, initialTextInputState, TextInputAsyncActions)
    let inputRef = useRef<HTMLInputElement>(null)   //<HTMLInputElement | HTMLTextAreaElement>

    useEffect(() => {
        dispatch(TextInputActions.setValue(initialValue))
    }, [initialValue])

    const startEdit = () => {
        dispatch(TextInputActions.setIsEdit(true))
        if(inputRef && inputRef.current) inputRef.current.focus()
        console.log(inputRef.current)
    }
    const onChangeSetValue = (event : any) => {        //React.ChangeEvent
        const newValue = event.target.value
        dispatch(TextInputActions.setValue(newValue))
    }

    const endEdit = () => {
        dispatch(TextInputActions.setIsEdit(false))
        const LoadingOnServerAction = {
            type : 'LOADING_ON_SERVER_TEXT_INPUT',
            value : state.value,
            api, update, initialValue,
        }
        dispatch(LoadingOnServerAction)
    }

    return <div className={gSt.info__value}>
        {(state.isEdit) ?
            <input ref={inputRef} className={st.textInput__input}
            value={state.value || ''}
            onChange={onChangeSetValue}
            onBlur={endEdit}
        /> :
            <label onClick={startEdit} className={st.textInput__value}>{state.value || 'неуказано'}</label>}
        {state.isLoading && <img src={loadingGef} /> }
        {state.isError && <></>}
    </div>
}