import React from 'react'
import {TextInput} from './TextInput/TextInput'
import {api} from '../../../packets/api'
import { useDispatch } from 'react-redux'
import { LoginActions } from '../../../redux/reducers/LoginReducer/LoginActions'

import st from'./InfoProfile.module.scss'

interface IProps {
    username : string | null,
    email : string | null,
}
export const InfoProfile : React.FC<IProps> = ({ username, email}) => {

    const dispatch = useDispatch()
    const updateUsername  = (value : string) => dispatch(LoginActions.setUsername(value))
    const updateEmail = (value : string) => dispatch(LoginActions.setEmail(value))

    return <div className={st.info}>
        <div>
        <label className={st.info__parameter}>Логин</label>
        <TextInput initialValue={username}
                   api={api.user.putUsername}
                   update={updateUsername}
        /></div>

        <div>
        <label className={st.info__parameter}>Email</label>
        <TextInput initialValue={email}
                   api={api.user.putEmail}
                   update={updateEmail}
        />
        </div>

    </div>
}