import {InferValueTypes} from '../../redux/store'
import {AnyAction} from 'redux'
import {apiResponse, IDictionaryPage, IMaterial} from '../../packets/api/TypeRequest'
import {api} from "../../packets/api";

interface IDictionaryState {
    words : IMaterial[],
    page : number,
    isLoading : boolean,
    numberPages : number,
    selectWords : Map<number, IMaterial[]>,
}

export const initialDictionaryState : IDictionaryState = {
    words : [],
    page : 0,
    isLoading : false,
    numberPages : 1,
    selectWords : new Map(),
}

export const DictionaryReducer = (state : IDictionaryState, action : DictionaryActionsType) => {
    switch (action.type) {
        case 'DICTIONARY__SET_WORDS' : return {...state, 
            words : action.words, 
            numberPages : action.numberPages,
            page : action.page,
        }
        
        case 'DICTIONARY__SET_IS_LOADING' : return {...state, isLoading : action.isLoading}

        case 'DICTIONARY__SWITCH_PAGE' : return {...state, 
            selectWords : action.selectWords, 
        }

        default : return state
    }
}

export const DictionaryActions = {
    setPage (page : number) {
        return {
            type : 'DICTIONARY__SET_PAGE' as const, page
        }
    },

    setWords (words : IMaterial[], numberPages : number, page : number) {
        return {
            type : 'DICTIONARY__SET_WORDS' as const,
            words, numberPages, page
        }
    },

    setLoading ( isLoading : boolean) {
        return {
            type : 'DICTIONARY__SET_IS_LOADING' as const,
            isLoading
        }
    },

    switchPage (words : IMaterial[], page : number, selectWords : Map<number, IMaterial[]>) {
        if (selectWords.has(page)) selectWords.delete(page)
        selectWords.set(page, words)
        return {
            type : 'DICTIONARY__SWITCH_PAGE' as const,
            selectWords
        }
    },

}

type DictionaryActionsType = ReturnType<InferValueTypes<typeof DictionaryActions>>

const maxWordsOnPage = 10

type objDispatch = {  dispatch : any }
export const DictionaryAsyncActions = {
    DICTIONARY__SET_PAGE : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        try {
            dispatch(DictionaryActions.setLoading(true))
            const page = action.page
            const begin = (page - 1) * maxWordsOnPage
            const end =  page * maxWordsOnPage
            let res : apiResponse<IDictionaryPage>
            res = await api.user.getDictionary(begin, end)
            if (res.data.data) {
                const pageData = res.data.data
                const numberPages = Math.ceil(pageData.dictionarySize / maxWordsOnPage)
                dispatch(DictionaryActions.setWords(pageData.words, numberPages, page))
                dispatch(DictionaryActions.setLoading(false))
            }
        }
        catch (e) {
            dispatch(DictionaryActions.setLoading(false))
            console.log(e)
        }


    }
}

const responsTest = {
    words : [
        {proposal: 'i', proposalRus: 'я', audio: ''},
        {proposal: 'student', proposalRus: 'студент', audio: ''},
        {proposal: 'manager', proposalRus: 'менеджер', audio: ''},
        {proposal: 'doctor', proposalRus: 'доктор', audio: ''},
        {proposal: 'i', proposalRus: 'я', audio: ''},
        {proposal: 'student', proposalRus: 'студент', audio: ''},
        {proposal: 'manager', proposalRus: 'менеджер', audio: ''},
        {proposal: 'doctor', proposalRus: 'доктор', audio: ''},
        {proposal: 'manager', proposalRus: 'менеджер', audio: ''},
        {proposal: 'doctor', proposalRus: 'доктор', audio: ''},
    ],
    dictionarySize : 16
}
