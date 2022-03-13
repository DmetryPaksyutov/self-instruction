import React, {useState} from 'react'
import {useAppSelector} from '../../packets/hooks'

import {Navigate} from 'react-router-dom'
import {RegistrationForm} from './RegistrationForm/RegistrationForm'
import {LoginForm} from './LoginForm/LoginForm'

import st from './Login.module.scss'


export const Login : React.FC = () => {
    const [isReg, setIsReg] = useState(false)

    const isLogin = useAppSelector(state => state.login.isLogin)
    if (isLogin) return <Navigate to={'/'}/>


    const stReg = `${st.login__typeForm} ${(isReg) ? st.login__typeForm_active : st.login__typeForm_noActive}`
    const stLogin = `${st.login__typeForm} ${(!isReg) ? st.login__typeForm_active : st.login__typeForm_noActive}`
    const Form = (isReg) ? <RegistrationForm/> : <LoginForm/>

    const onClickReg = () => {setIsReg(true)}
    const onClickLogin = () => {setIsReg(false)}

    return <div className={st.login} >
        <div className={stReg} onClick={onClickReg}>
            <label>Регестрация</label>
        </div>
        <div className={stLogin} onClick={onClickLogin}>
            <label>Вход</label>
        </div>

        <div className={st.login__form}>
            {Form}
        </div>
    </div>
}