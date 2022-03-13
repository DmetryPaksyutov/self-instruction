import {InferValueTypes} from '../../../../redux/store'
import { AnyAction } from 'redux'
import { apiResponse } from '../../../../packets/api/TypeRequest'
import {storage} from "../../../../packets/storage";

interface ITextInputState {
    value : valueType,
    isEdit : boolean,
    isLoading : boolean,
    isError : boolean,
    error : string | null,
}
type valueType = string | number | null

export const initialTextInputState = {
        value : null,
        isEdit: false,
        isLoading : false,
        isError : false,
        error : null,
}

export const TextInputReducer = (state : ITextInputState, action : TextInputActionsType) => {
    switch (action.type) {
        case 'SET_VALUE_TEXT_INPUT' : return {...state, value : action.value, isError : false}
        case 'SET_IS_EDIT_TEXT_INPUT' : return {...state, isEdit : action.isEdit}
        case 'SET_IS_LOADING_TEXT_INPUT' : return {...state, isLoading : action.isLoading}
        case 'SET_ERROR_TEXT_INPUT' : return {...state, isError : true}
        default: throw new Error('no such action type');
    }
}

type TextInputActionsType = ReturnType<InferValueTypes<typeof TextInputActions>>
export const TextInputActions = {
    setValue (value : valueType) {
        return {
            type : 'SET_VALUE_TEXT_INPUT' as const, value,
        }
    },
    setIsEdit (isEdit : boolean) {
        return {
            type : 'SET_IS_EDIT_TEXT_INPUT' as const, isEdit,
        }
    },
    setIsLoading (isLoading : boolean) {
        return {
            type : 'SET_IS_LOADING_TEXT_INPUT' as const, isLoading,
        }
    },
    setError (error : string) {
        return { type : 'SET_ERROR_TEXT_INPUT' as const, error }
    }
}

type objDispatch = {  dispatch : any }
export const TextInputAsyncActions = {
    LOADING_ON_SERVER_TEXT_INPUT : ({ dispatch } : objDispatch) => async (action : AnyAction) => {
        if (action.value !== action.initialValue) {
            dispatch(TextInputActions.setIsLoading(true))
            let res : apiResponse<any>
            try {
                res = await action.api()
                if (res.data.data?.token) {
                    action.update(action.value)
                    storage.jwtStorage.set(res.data.data.token)
                    dispatch(TextInputActions.setIsLoading(false))
                }

            }
            catch (e) {
                dispatch(TextInputActions.setIsLoading(false))

                dispatch(TextInputActions.setError('ошибка при работе с сервером'))
                
            }
        }
    }
}