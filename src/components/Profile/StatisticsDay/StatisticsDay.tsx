import React, {useEffect} from 'react'
import {useReducerAsync} from "use-reducer-async";
import {
    ProfileStatisticsReducer,
    initialProfileState,
    ProfileStatisticsAsyncActions,
    ProfileStatisticsActions,
} from './StatisticsDayReducer'
import {Loading} from "../../common/Loading/Loading";
import {DailyPlan} from "../../common/DailyPlan/DailyPlan";

import st from './StatisticsDay.module.scss'

export const StatisticsDay : React.FC = () => {
    const [state, dispatch] = useReducerAsync(ProfileStatisticsReducer, initialProfileState, ProfileStatisticsAsyncActions)
    const {isLoadingStatisticsDay,
        time,
        balls,
        passedExercises,
    } = state

    useEffect(() => {
        dispatch(ProfileStatisticsActions.setStatistics())
    }, [])

    if (isLoadingStatisticsDay) return <Loading/>
debugger
    return <div className={st.statistics}>
        <div className={st.statistics__header}><label>Статистика за день</label></div>

        <div className={st.statistics__data}>
            <div>
                <label>Набрано балов: </label>
                <label>{balls}</label>
            </div>
            <div>
                <label>Время занятий: </label>
                <label>{time}</label>
            </div>
            <div>
                <label>Пройдено уроков: </label>
                <label>{passedExercises}</label>
            </div>
        </div>

        <div className={st.statistics__dailyPlan}>
            <div className={st.statistics__dailyPlan__header}><label>Дневной план</label></div>
            <div className={st.statistics__dailyPlan__block}><DailyPlan/></div>
        </div>
    </div>
}