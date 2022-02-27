import React from 'react'
import {typeExercise} from '../ExerciseReducer'
import st from './NavbarExercise.module.scss'


interface IProps {
    typeExercise : typeExercise,
    setTypeExercise : (typeExercise : typeExercise) => () => void,
    openDictionary : () => void,
}

export const NavbarExercise : React.FC<IProps> = ({typeExercise,
                                                  setTypeExercise,
                                                  openDictionary}) => {
    const listText = ['Правило', 'Словарь', 'Аудирование', 'Переод', 'Диктант']
    const list = listText.map( (text, index) => {
        let onClick
        if (index === 1) onClick = () => {
            setTypeExercise(index as typeExercise)()
            openDictionary()
        }
        else onClick = setTypeExercise(index as typeExercise)

        return <div key={index}>
        <button className={(index === typeExercise) ? st.navbarExercise__item_active : st.navbarExercise__item}
                onClick={onClick}
        >{text}</button>
    </div>})

    return <div className={st.navbarExercise}>
        {list}
    </div>
}

