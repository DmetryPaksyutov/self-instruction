import { settingsDailyPlanType } from '../../../redux/reducers/UserWork/UserWorkReducer'
import {getItem, setItem, removeItem} from '../storage'

const getSettingsDailyPlan = () : settingsDailyPlanType => {
    const satingDP = getItem('satingDP')
    const satiing = (satingDP) ? parseInt( satingDP ) as settingsDailyPlanType : 15
    return satiing
}

const setSettingsDailyPlan = (sating : settingsDailyPlanType) => {
    const satingStr = `${sating}`
    setItem('satingDP', satingStr)
}

const getTimeWork = () : number => {
    const dateWork = getItem('dateWork')
    const date = new Date().toLocaleDateString()
    if (dateWork && date === dateWork) {
        const durationWork = getItem('timeWork')
        if (durationWork)
            return parseInt(durationWork)
        else return 0
    }
    else {
        removeItem('timeWork')
        setItem('dateWork', date)
        return 0
    }
}

const setTimeWork = (timeWork : number) => {
    const date = new Date().toLocaleDateString()
    setItem('dateWork', date)
    let time = getTimeWork()
    setItem('timeWork', `${time + timeWork}`)
    
}

export const dailyPlanStorage = {
    getSettingsDailyPlan, 
    setSettingsDailyPlan,
    getTimeWork,
    setTimeWork,
}

