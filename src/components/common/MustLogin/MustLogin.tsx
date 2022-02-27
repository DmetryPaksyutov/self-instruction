import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../packets/hooks'
import smiley from '../../../img/neutral-smiley.png'

import st from './MustLogin.module.scss'

interface IProps {
    children : React.ReactNode
}

export const MustLogin : React.FC<IProps> = ( { children } ) => {
    const isLogin = useAppSelector(state => state.login.isLogin)

    if (isLogin) return <div>{children}</div>
    return <div className={st.MustLogin}>
        <div className={st.MustLogin__img}><img src={smiley}/></div>
        <div className={st.MustLogin__label}><Link to={'/login'}>Для доступа к странице вам необходимо авторизоваться</Link></div>
    </div>
}
