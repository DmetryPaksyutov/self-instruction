import React from 'react'
import st from './NavbarExercise.module.scss'

export const NavbarExercise : React.FC = () => {
    return <div className={st.navbarExercise}>
        <div><label>Правило</label></div>
        <div><label>Словарь</label></div>
        <div><label>Аудирование</label></div>
        <div><label>Переод</label></div>
        <div><label>Диктант</label></div>
    </div>
}