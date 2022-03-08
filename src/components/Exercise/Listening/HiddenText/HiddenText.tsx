import React, {useState} from 'react'

import stGlobal from '../../Exercise.module.scss'
import st from './HiddenText.module.scss'

import eyeOpenImg from '../../../../img/eye/eye_open.png'
import eyeClosedImg from '../../../../img/eye/eye_closed.png'

interface IProps {
    text : string
}

export const HiddenText : React.FC<IProps> = ({text}) => {
    const [isVisible, setIsVisible] = useState(false)
    const img = (isVisible) ? eyeClosedImg : eyeOpenImg
    const stText = `${st.hiddenText__textBox} ${isVisible && st.hiddenText__textBox_noVisible}`
    const onSetVisible = () => {
        setIsVisible(!isVisible)
    }

    return <div className={`${stGlobal.exercise__header} ${st.hiddenText}`}>
        <button className={st.hiddenText__button} onClick={onSetVisible}>
            <img src={img} />
        </button>
        <div className={stText}><label>{text}</label></div>
    </div>
}