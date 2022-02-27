import React, {useState} from 'react'
import burgerIcon from '../../../img/burger.png'
import {useMenu} from '../../../packets/hooks'
import {Link} from 'react-router-dom'
import {NavigationMenu} from '../Menu/NavigationMenu'
import {ProfileMenu} from '../Menu/ProfileMenu'
import stMenu from '../Menu/Menu.module.scss'
import st from './Burger.module.scss'

interface IProps {
    isLogin : boolean,
}

export const Burger : React.FC<IProps> = ( { isLogin }) => {
    const [isVisible, setIsVisible] = useState(false)
    const refProfileMenu = useMenu(setIsVisible)

    const openMenu = () => {
        if (isVisible)
            setIsVisible(false)
        else setIsVisible(true)
    }
    return <div>
        <div onClick={openMenu} className={st.burgerBlock}>
            <img src={burgerIcon}/>

            <div ref={refProfileMenu}
                 className={ `${ !isVisible && stMenu.menu_noSee } ${stMenu.menu}` }>
                {(!isLogin) && <div className={stMenu.menuItems}><div><Link to={'/login'}>Войти</Link></div></div>}
                <NavigationMenu style={stMenu.menuItems}/>
                {(isLogin) && <ProfileMenu style={stMenu.menuItems}/>}
            </div>
        </div>
    </div>
}