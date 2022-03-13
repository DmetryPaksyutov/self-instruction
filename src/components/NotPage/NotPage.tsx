import React from 'react';
import {Link} from 'react-router-dom'
import st from './NotPage.module.scss'

export const NotPage :  React.FC = () => {
    return <div className={st.notPage}>
        <h2>404</h2>
        <h4>Данной страницы несуществует.</h4>
        <p>Страница, соответстующая данному URL несущетвует.</p>
        <Link to={'/'}>Вернитесь к домашней странице.</Link>
    </div>
}