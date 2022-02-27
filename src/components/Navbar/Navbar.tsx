import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useAppSelector} from '../../packets/hooks'
import {useDispatch} from 'react-redux'
import {LoginActions} from '../../redux/reducers/LoginReducer/LoginActions'

import {NavigationMenu} from './Menu/NavigationMenu'
import {Logo} from './Logo/Logo'
import {ProfileIcon} from './ProfileIcon/Profile'
import {Burger} from './Burger/Burger'

import st from './Navbar.module.scss'
import stCenterBlock from '../common/styles/centerBlock.module.scss'



export const Navbar : React.FC = ()  => {
    const isLogin = useAppSelector(state => state.login.isLogin)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(LoginActions.updateAccount())
    }, [])

    return <div className={st.navbar}>
        <div className={`${stCenterBlock.centerBlock} ${st.navbar__content}`}>
            <Logo/>
            <NavigationMenu style={st.navbar__navigationMenu}/>
            {(isLogin) ?
                <div className={st.navbar__profile}><ProfileIcon/></div> :
                <div className={st.navbar__enter}><Link to={'/login'}>Войти</Link></div>}

            <div className={st.navbar__burger}><Burger isLogin={isLogin}/></div>

        </div>
    </div>
}