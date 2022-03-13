import React from 'react'
import {Link} from "react-router-dom";

interface props {
    style : any,
}

export const NavigationMenu : React.FC<props> = ({ style }) => {
    return <div className={style}>
        <div><Link to={'/'}>Курсы</Link></div>
        <div><Link to={'/dictionary/1'}>Словарь</Link></div>
        <div><Link to={'/statistics'}>Статистика</Link></div>
    </div>
}


//<div><Link to={'/'}>Тренажёр слов</Link></div>