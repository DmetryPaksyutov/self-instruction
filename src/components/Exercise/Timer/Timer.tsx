import React, {useEffect, useState} from 'react'
import {useInterval} from '../../../packets/hooks'
import {eventBus} from '../../../packets/eventBus'

import st from '../Exercise.module.scss'
import {useDispatch} from "react-redux";
import {UserWorkActions} from "../../../redux/reducers/UserWork/UserWorkActions";


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

    const dispatch = useDispatch()
    useEffect(() => {
        /*const replaySubscribe = eventBus.saveTime.subscribe(() => {
            dispatch(UserWorkActions.setTime(minutes, seconds))
        })*/
        dispatch(UserWorkActions.setMinutes(minutes))
        console.log(`useEffect ${minutes}`)
        return () => {
            //replaySubscribe()
        }
    }, [minutes])

    let time = `${(minutes < 10) ? '0'+ minutes : minutes }:${ (seconds < 10) ? '0'+ seconds : seconds}`

    return <div>
        <label className={st.exercise__text}>Время </label>
        <label className={st.exercise__selectedText}>{time}</label>
    </div>
}