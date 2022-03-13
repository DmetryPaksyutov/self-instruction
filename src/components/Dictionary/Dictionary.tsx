import React, { useEffect, useState } from 'react'
import { useReducerAsync } from 'use-reducer-async'
import { Loading } from '../common/Loading/Loading'
import { DictionaryReducer, 
    initialDictionaryState, 
    DictionaryAsyncActions, 
    DictionaryActions
} from './DictionaryReducer'

import { RowDictionary } from '../common/RowDictionary/RowDictionary'
import { useParams } from 'react-router-dom'

import st from './Dictionary.module.scss'
import { IMaterial } from '../../packets/api/TypeRequest'


export const Dictionary : React.FC = () => {
    const [state, dispatch] = useReducerAsync(DictionaryReducer, 
        initialDictionaryState, DictionaryAsyncActions)
    const {words, 
        page, 
        numberPages, 
        selectWords,
        isLoading
    } = state

    const urlParams = useParams()
    useEffect(() => {
        if (urlParams.page) {
            const newPage = parseInt(urlParams.page)
            if (newPage !== page) {

                
                dispatch(DictionaryActions.setPage(newPage))
            }
        }
        
    }, [urlParams.page])


    let [isAddWords, setIsAddWords] = useState<boolean[]>(new Array<boolean>())
    /*let newIsAdd = selectWords.get(page)?.map(() => {
        //find word in state.words
    })*/

    const td = words.map((word, index) => {
        const isAdd = isAddWords[index]
        const setIsAdd = () => {
            let newIsAddWords = [...isAddWords]
            newIsAddWords[index] = !isAdd
            setIsAddWords(newIsAddWords)
        } 
        return <RowDictionary proposal={word.proposal}
        proposalRus={word.proposalRus}
        audio={word.audio} isAdd={isAdd} setIsAdd={setIsAdd}/>
    })


    const onSetPage = (i : number) => () => {
        let newSelectWords : IMaterial[] = []
        isAddWords.forEach((isAdd, index) => {
            if (isAdd) newSelectWords.push(words[index])
        })
        dispatch(DictionaryActions.switchPage(newSelectWords, page, selectWords))
        dispatch(DictionaryActions.setPage(i))
    }
    let pages = []
    for (let i = 1; i <= numberPages; i++) {
        
        if (i === page) pages.push(<button className={st.dictionary__pageActive}>{i}</button>)
        else pages.push(<button onClick={onSetPage(i)}>{i}</button>)
    }

    if (isLoading) return <Loading/>
    
    return <div className={st.dictionary}>
        <div className={st.dictionary__header}><label>Словарь</label></div>

        <div className={st.dictionary__table}>
            <table  >
            
            <tr>
                <th></th>
                <th>слово</th>
                <th>перевод</th>
                <th>выбрать</th>
            </tr>
            
             {td}  
        
           </table>
        </div>
        
        <div className={st.dictionary__pages}>
            {pages}
        </div>
    </div>
}