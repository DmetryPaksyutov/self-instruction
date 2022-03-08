import React from 'react'
import { DailyPlan } from '../../common/DailyPlan/DailyPlan'

import st from './HomeDailyPlan.module.scss'

export const HomeDailyPlan : React.FC = () => {
    return <div className={st.homeDailyPlan}>
        <div className={st.homeDailyPlan__content}><DailyPlan/></div>
        <div className={st.homeDailyPlan__header}><label>Дневной план</label></div>
    </div>
}