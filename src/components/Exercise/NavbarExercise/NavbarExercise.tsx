import React from 'react'
import {typeExercise} from '../ExerciseReducer'
import st from './NavbarExercise.module.scss'


interface IProps {
    typeExercise : typeExercise,
    setTypeExercise : (typeExercise : typeExercise) => () => void,
}

export const NavbarExercise : React.FC<IProps> = ({typeExercise,
                                                  setTypeExercise, }) => {
    const listText = ['Правило', 'Словарь', 'Аудирование', 'Переод', 'Диктант']
    const list = listText.map( (text, index) => <div key={index}>
        <button className={(index === typeExercise) ? st.navbarExercise__item_active : st.navbarExercise__item}
                onClick={setTypeExercise(index as typeExercise)}
        >{text}</button>
    </div>)

    return <div className={st.navbarExercise}>
        {list}
    </div>
}

