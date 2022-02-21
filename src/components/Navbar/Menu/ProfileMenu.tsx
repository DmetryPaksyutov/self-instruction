import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {LoginActions} from '../../../redux/reducers/LoginReducer/LoginActions'

interface IProps {
    style : any,
}

export const ProfileMenu : React.FC<IProps> = ( {style}) => {
    const dispatch = useDispatch()
    const onExit = () => {dispatch(LoginActions.logoutAccount())}

    return <div className={style}>
        <div><Link to={'/'}>Профиль</Link></div>
        <div onClick={onExit}><Link to={'/login'}>Выход</Link></div>
    </div>
}