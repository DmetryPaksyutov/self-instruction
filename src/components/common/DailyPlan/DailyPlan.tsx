import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../packets/hooks'
import { initialTimeThunk } from '../../../redux/reducers/UserWork/UserWorkActions'

import st from './DailyPlan.module.scss'
import {SettingsDailyPlan} from './SettingsDailyPlan/SettingsDailyPlan'

import settingImg from '../../../img/setting.png'

export const DailyPlan : React.FC = () => {
    
    const [satingDailyPlan, percent] = useAppSelector(state => { 
        return [state.userWork.settingsDailyPlan, state.userWork.percent]
    })

    const {isVisibleSettings,
        onSetVisibleSettings,
        setVisibleSettings
    } = useVisibleSating()
    

    const radius = 85

    const circumference = 2 * Math.PI * radius
    const offset = circumference - percent / 100 * circumference

    const stCircle = {
        strokeDashoffset : offset,
        strokeDasharray : `${circumference} ${circumference}`,
        stroke: '#d77d31',
        strokeWidth: 15,
        fill: 'transparent',
        transformOrigin : 'center',
        transform: 'rotate(-90deg)',
    }
    
    return <div className={st.dailyPlan}>
        <div className={st.dailyPlan__button}><button onClick={onSetVisibleSettings}><img src={settingImg}/></button></div>
        
        <div className={st.dailyPlan__progress}>
            <svg >
                <circle style={stCircle} 
                cx={'100'} cy={'100'} r={radius}
                />
            </svg>

            <div className={st.dailyPlan__progressText}><label>{percent}%</label></div>
        </div>

        {(isVisibleSettings) && <SettingsDailyPlan 
                                    onSetVisibleSettings={onSetVisibleSettings} 
                                    setVisibleSettings={setVisibleSettings}
        />}
    </div>
}

const useVisibleSating = () => {
    const [isVisibleSettings, setVisibleSettings] = useState(false)
    const onSetVisibleSettings = () => {
        setVisibleSettings(!isVisibleSettings)
    }
    return {isVisibleSettings, onSetVisibleSettings, setVisibleSettings}
}