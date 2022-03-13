import React from 'react'
import st from './Avatar.module.scss'
import defaultAvatar from '../../../img/default_avatar_2.png'

interface IProps {
    avatar : string | null,
}
export const Avatar : React.FC<IProps> = ({ avatar }) => {
    return <div>
        <div className={st.avatar__img}>
            <img src={defaultAvatar}/>
        </div>
        <div>
            {/* <button className={st.avatar__button}>обновить фото</button>*/}
        </div>
    </div>
}

//(avatar) ? avatar : 