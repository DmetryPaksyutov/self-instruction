import React from 'react'
import {Link} from "react-router-dom";

interface props {
    style : any,
}

export const NavigationMenu : React.FC<props> = ({ style }) => {
    return <div className={style}>
        <div><Link to={'/home'}>Курсы</Link></div>
        <div><Link to={'/'}>Тренажёр слов</Link></div>
        <div><Link to={'/'}>Словарь</Link></div>
        <div><Link to={'/'}>Статистика</Link></div>
    </div>
}