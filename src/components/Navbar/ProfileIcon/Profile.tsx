import React, {useState} from 'react'
import st from './Profile.module.scss'
import stMenu from '../Menu/Menu.module.scss'
import defaulteAvatar from '../../../img/default_avatar.png'
import {useMenu} from "../../../packets/hooks";
import {ProfileMenu} from "../Menu/ProfileMenu";

interface IProps {
    img? : any,
}

export const ProfileIcon : React.FC<IProps> = ({ img}) => {
    const [isVisible, setIsVisible] = useState(false)
    const refProfileMenu = useMenu(setIsVisible)

    const openMenu = () => {
        if (isVisible)
            setIsVisible(false)
        else setIsVisible(true)
    }

    return <div className={st.profileBlock} >
        <img src={ img || defaulteAvatar} onClick={openMenu}/>

        <div ref={refProfileMenu}
             className={` ${ !isVisible && stMenu.menu_noSee} ${stMenu.menu}`}>
            <ProfileMenu style={stMenu.menuItems}/>
        </div>
    </div>
}
