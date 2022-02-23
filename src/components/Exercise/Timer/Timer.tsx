import React, {useState} from 'react'
import {useInterval} from '../../../packets/hooks'

import st from '../Exercise.module.scss'

export const Timer : React.FC = () => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useInterval ( () => {
        if (seconds >= 59) {
            setMinutes(minutes + 1)
            setSeconds(0)
        }
        else setSeconds(seconds + 1)
    }, 1000)

    let time = `${(minutes < 10) ? '0'+ minutes : minutes }:${ (seconds < 10) ? '0'+ seconds : seconds}`
    /*if (minutes < 10) time += `0${minutes} : `
    else time += `${minutes}`
    if (seconds < 10) time += `0${seconds}`
    else time += `${seconds}`*/

    return <div>
        <label className={st.exercise__text}>Время </label>
        <label className={st.exercise__selectedText}>{time}</label>
    </div>
}