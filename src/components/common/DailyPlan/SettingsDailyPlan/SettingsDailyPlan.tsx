import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector, useMenu } from '../../../../packets/hooks'
import { updateSettingsThunk } from '../../../../redux/reducers/UserWork/UserWorkActions'
import { settingsDailyPlanType } from '../../../../redux/reducers/UserWork/UserWorkReducer'

import st from './SettingsDailyPlan.module.scss'

interface IProps {
    onSetVisibleSettings : () => void,
    setVisibleSettings : Dispatch<SetStateAction<boolean>>
}

export const SettingsDailyPlan : React.FC<IProps> = ({ onSetVisibleSettings, setVisibleSettings}) => {
    const wrapperRef = useMenu(setVisibleSettings)

    const settings = useSetSettings()
    const dispatch = useDispatch()
    const r1 = useCheckedRadio(settings[0], dispatch)
    const r2 = useCheckedRadio(settings[1], dispatch)
    const r3 = useCheckedRadio(settings[2], dispatch)

    return <div ref={wrapperRef} className={st.settingsDailyPlan}>
        <div className={st.settingsDailyPlan__closeButton}>
            <button onClick={onSetVisibleSettings}>x</button>
        </div>

        <div className={st.settingsDailyPlan__radioGroup}>
            <label><input type={'radio'} 
                name={'stingsDailyPlan'}
                value={15} 
                checked={settings[0]}
                onChange={r1.onChenge}
                />  15 мин</label>
            <label><input type={'radio'} 
                name={'stingsDailyPlan'}
                value={30}
                checked={settings[1]}
                onChange={r2.onChenge}
                />  30 мин</label>
            <label><input type={'radio'} 
            name={'stingsDailyPlan'}
            value={60} 
            checked={settings[2]}
            onChange={r3.onChenge}
            />  60 мин</label>
        </div>
    </div>
}

const useCheckedRadio = (initialChecked : boolean, dispatch : any) => {
    const [isChecked, setChecked] = useState(initialChecked)
    if (isChecked && !initialChecked) setChecked(false)
    const onChenge = (event : any) => {
        setChecked(event.target.checked)
        const settings = parseInt(event.target.value) as settingsDailyPlanType
        dispatch(updateSettingsThunk(settings))
    }

    return {isChecked, onChenge}
}

const useSetSettings = () => {
    const tecSetting = useAppSelector(state => state.userWork.settingsDailyPlan)
    let settings = [false, false, false]
    const newSettings = (i : number) => {
            settings = [false, false, false]
            settings[i] = true
    }

    switch (tecSetting) {
        case 15 :  newSettings(0)
        break
        case 30 : newSettings(1)
        break
        case 60 : newSettings(2)
        break
    }
    
    return settings
}