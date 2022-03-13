import React from 'react'

import {useAppSelector} from '../../packets/hooks'
import {Avatar} from './Avatar/Avatar'
import {InfoProfile} from './InfoProfile/InfoProfile'
import { StatisticsDay } from './StatisticsDay/StatisticsDay'

import st from './Profile.module.scss'


export const Profile : React.FC = () => {
    const {avatar, username, email} = useAppSelector(state => {
        return { 
            avatar : state.login.avatar,
            username : state.login.username,
            email : state.login.email,
        }
    } )
    
    return <div className={st.profile}>

        <div className={st.profile__avatar}>
            <Avatar avatar={avatar}/>
        </div>

        <div className={st.profile__info}>
              <InfoProfile username={username}
                   email={email}
               /> 
        </div>
    
    <div className={st.profile__statistics}>
        <StatisticsDay/>
    </div>
    </div>
}