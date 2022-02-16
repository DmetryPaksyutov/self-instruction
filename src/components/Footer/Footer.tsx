import React from 'react'
import st from './Footer.module.scss'

export const Footer : React.FC = ()  => {
    return <div className={st.footer}>
        <div><label>Данный проект создан Паксютовым Дмитрием исключительно в образовательных целях</label></div>
    </div>
}