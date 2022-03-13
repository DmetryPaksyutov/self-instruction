import React, {useCallback, useEffect} from 'react'
import {AdditionalNavbar} from '../common/AdditionalNavbar/AdditionalNavbar'
import {useReducerAsync} from 'use-reducer-async'
import {
    StatisticsReducer,
    initialStatisticsState,
    StatisticsAsyncActions,
    StatisticsActions,
    typeDataChart,
    typeIntervalTime,
} from './StatisticsReducer'
import {IStatisticsDay} from '../../packets/api/TypeRequest'
import {Loading} from '../common/Loading/Loading'
import {Chart} from './Chart/Chart'

import st from './Statistics.module.scss'

export const Statistics = () => {
    const [state, dispatch] = useReducerAsync(StatisticsReducer, initialStatisticsState, StatisticsAsyncActions)
    const {
        typeDataChart,
        typeIntervalTime,
        begin,
        end,
        statistics,
        isLoading,
        isErrorLoading
    } = state

    useEffect(() => {
        console.log('1')
        dispatch(StatisticsActions.initialInterval(typeIntervalTime, begin, end))
    }, [typeIntervalTime])


    const Config = updateConfig(statistics, typeIntervalTime, typeDataChart)


    const setTypeDataChart = useCallback((typeDataChart : number) => () => {
        dispatch(StatisticsActions.setTypeData(typeDataChart as typeDataChart))
    }, [])

    const setTypeIntervalTime = useCallback((typeIntervalTime : number) => () => {
        dispatch(StatisticsActions.setTypeIntervalTime(typeIntervalTime as typeIntervalTime))
    }, [])

    const onShiftLift = () => {
        dispatch(StatisticsActions.shiftIntervalLift(typeIntervalTime, begin, end))
    }

    const onShiftRight = () => {
        dispatch(StatisticsActions.shiftIntervalRight(typeIntervalTime, begin, end))
    }

    const beginStr = (begin) ? begin.toLocaleDateString() : ''
    const endStr = (end) ? end.toLocaleDateString() : ''

    return <div className={st.statistics}>
        <div className={st.statistics__navigate}><AdditionalNavbar activeItem={typeDataChart} setActiveItem={setTypeDataChart} listItems={['Время', 'Балы', 'Пройденые уроки']}/></div>
        <div className={st.statistics__navigate}><AdditionalNavbar activeItem={typeIntervalTime} setActiveItem={setTypeIntervalTime} listItems={['За неделю', 'За месяц']}/></div>

        <div className={st.statistics__interval}>
            <div><button onClick={onShiftLift}>{'<'}</button></div>
            <div><label>{beginStr} - {endStr}</label></div>
            <div><button onClick={onShiftRight}>{'>'}</button></div>
        </div>

        <div className={st.statistics__chart}>
            {(isLoading) ? <Loading/> : (!isErrorLoading) ? <Chart Config={Config}/> : <label>Неудалось получить даные с сервера</label>}
        </div>
    </div>
}

const updateConfig = (statistics : Array<IStatisticsDay | null>,
                        typeIntervalTime : typeIntervalTime,
                        typeDataChart : typeDataChart) => {
    let Config : any = {
        type: 'bar',
        title: {
            text: 'Статистика',
            fontSize: 24,
        },
        legend: {
            draggable: true,
        },
        scaleX: {
            label: { text: '' },
            labels: []
        },
        plot: {
            animation: {
                effect: 'ANIMATION_EXPAND_BOTTOM',
                method: 'ANIMATION_STRONG_EASE_OUT',
                sequence: 'ANIMATION_BY_NODE',
                speed: 275,
            }
        },
        series: [
            {
                values: [],
                text: '',
                backgroundColor : '#D2691E',
            }]

    }

    const setValue = (typeDataChart : typeDataChart, statisticsDay : IStatisticsDay | null) => {
        if (!statisticsDay) return 0
        switch (typeDataChart) {
            case 0 : return statisticsDay.time
            case 1 : return statisticsDay.balls
            case 2 : return statisticsDay.passedExercises
        }
    }

    let values = []
    if (typeIntervalTime === 0) {
        Config.scaleX.labels =['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
        Config.scaleX.label.text = 'Дни недели'
        for (let i = 0; i < statistics.length; i++) {
            values.push(setValue(typeDataChart, statistics[i]))
        }
        Config.series[0].values = values
    }
    else {
        let data = []
        for (let i = 0; i < statistics.length; i++) {
            values.push(setValue(typeDataChart, statistics[i]))
            data.push(`${i + 1}`)
        }
        Config.scaleX.label.text = 'Дни месяца'
        Config.scaleX.labels = data
        Config.series[0].values = values
    }

    switch (typeDataChart) {
        case 0 : Config.series[0].text = 'Время'
            break
        case 1 : Config.series[0].text = 'Балы'
            break
        case 2 : Config.series[0].text = 'Пройденые уроки'
            break
    }

    return Config
}