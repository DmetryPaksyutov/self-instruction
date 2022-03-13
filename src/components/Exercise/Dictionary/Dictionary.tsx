import React, { useState } from 'react'
import { IMaterial } from '../../../packets/api/TypeRequest'

import st from './Dictionary.module.scss'
import stButton from '../../common/styles/button.module.scss'
import stCheckbox from '../../common/styles/checkbox.module.scss'
import {RowDictionary} from "../../common/RowDictionary/RowDictionary";

interface IProps {
    words : IMaterial[],
    closeDictionary : (selectWords : IMaterial[]) => void
}

export const Dictionary : React.FC<IProps> = ({words, closeDictionary}) => {
    
    let [isAddWords, setIsAddWords] = useState<boolean[]>(new Array<boolean>())
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

    const onCloseDictionary = () => {
        debugger
        let selectWords : IMaterial[] = []
        isAddWords.forEach((isAdd, index) => {
            if (isAdd) selectWords.push(words[index])
        })

        closeDictionary(selectWords)
    }
    
    return <div className={st.dictionary}>
        <table>
            <caption>Словарь</caption>
            <tr>
                <th></th>
                <th>слово</th>
                <th>перевод</th>
                <th>добавить в словарь</th>
            </tr>
            {td}
        </table>

        <div className={st.dictionary__button}>
            <button onClick={onCloseDictionary}
                    className={stButton.orangeButton}
            >Перейти к упражнению</button>
        </div>
    </div>
}