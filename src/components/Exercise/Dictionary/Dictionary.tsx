import React, { useState } from 'react'
import { IMaterial } from '../../../packets/api/TypeRequest'

import st from './Dictionary.module.scss'
import stButton from '../../common/styles/button.module.scss'
import stCheckbox from '../../common/styles/checkbox.module.scss'

interface IProps {
    words : IMaterial[],
    setVisibleDictionary : () => void
}

export const Dictionsry : React.FC<IProps> = ({words, setVisibleDictionary}) => {
    
    let [isAddWords, setIsAddWords] = useState<boolean[]>(new Array<boolean>())
    const td = words.map((word, index) => {
        const isAdd = isAddWords[index]
        const setIsAdd = () => {
            let newIsAddWords = [...isAddWords]
            newIsAddWords[index] = !isAdd
            setIsAddWords(newIsAddWords)
        }
        return <tr>
         <td><img/></td>
         <td>{word.proposal}</td>
          <td>{word.proposalRus}</td>
          <td><input type={'checkbox'}
                     checked={isAdd}
                     onChange={setIsAdd}
          />
          </td>
      </tr>
      })
    
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
            <button onClick={setVisibleDictionary}
                    className={stButton.orangeButton}
            >Перейти к упражнению</button>
        </div>
    </div>
}