import {InferValueTypes} from '../../redux/store'
import {AnyAction} from "redux";
import {apiResponse, IStatisticsDay} from "../../packets/api/TypeRequest";
import {api} from "../../packets/api";

interface IStatisticsState {
    typeDataChart : typeDataChart,
    typeIntervalTime : typeIntervalTime,
    begin : Date | null,
    end : Date | null,
    isLoading : boolean,
    isErrorLoading : boolean,
    statistics : Array<IStatisticsDay | null>,
}

export type typeDataChart = 0 | 1 | 2
export type typeIntervalTime = 0 | 1

export const initialStatisticsState : IStatisticsState = {
    typeDataChart : 1,
    typeIntervalTime : 0,
    begin : null,
    end : null,
    isLoading : false,
    isErrorLoading : false,
    statistics : [],
}

export const StatisticsReducer = (state : IStatisticsState, action : StatisticsActionsType) => {

    switch (action.type) {
        case 'STATISTICS__SET_TYPE_DATA_CHART' : return {...state, typeDataChart : action.typeDataChart}
        case 'STATISTICS__SET_TYPE_INTERVAL_TIME' : return {...state, typeIntervalTime : action.typeIntervalTime}
        case 'STATISTICS__SET_INTERVAL' : return {...state, begin : action.begin, end : action.end}
        case 'STATISTICS__SET_LOADING' : return {...state, isLoading : action.isLoading, isErrorLoading : action.isErrorLoading}
        case 'STATISTICS__SET_STATISTICS' : return {...state, statistics : action.statistics}

        default : return state
    }
}

export const StatisticsActions = {
    setTypeData (typeDataChart : typeDataChart) {
        return {
            type : 'STATISTICS__SET_TYPE_DATA_CHART' as const,
            typeDataChart
        }
    },

    setTypeIntervalTime (typeIntervalTime : typeIntervalTime) {
        return {
            type : 'STATISTICS__SET_TYPE_INTERVAL_TIME' as const,
            typeIntervalTime
        }
    },

    setInterval (begin : Date | null,
                 end : Date | null) {
        return {
            type : 'STATISTICS__SET_INTERVAL' as const,
            begin, end
        }
    },

    initialInterval (typeIntervalTime : typeIntervalTime,
                     begin : Date | null,
                     end : Date | null) {
        return {
            type : 'STATISTICS__INITIAL_INTERVAL' as const,
            typeIntervalTime, begin, end
        }
    },

    shiftIntervalLift (typeIntervalTime : typeIntervalTime,
                     begin : Date | null,
                     end : Date | null) {
        return {
            type : 'STATISTICS__SHIFT_INITIAL_LIFT' as const,
            typeIntervalTime, begin, end
        }
    },

    shiftIntervalRight (typeIntervalTime : typeIntervalTime,
                       begin : Date | null,
                       end : Date | null) {
        return {
            type : 'STATISTICS__SHIFT_INITIAL_RIGHT' as const,
            typeIntervalTime, begin, end
        }
    },

    setLoading (isLoading : boolean, isErrorLoading : boolean = false) {
        return {
            type : 'STATISTICS__SET_LOADING' as const,
            isLoading, isErrorLoading
        }
    },

    setStatistics (statistics : Array<IStatisticsDay | null>) {
        return {
            type : 'STATISTICS__SET_STATISTICS' as const,
            statistics
        }
    }
}
type StatisticsActionsType = ReturnType<InferValueTypes<typeof StatisticsActions>>

type objDispatch = {  dispatch : any }
export const StatisticsAsyncActions = {
    STATISTICS__INITIAL_INTERVAL : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        dispatch(StatisticsActions.setLoading(true))
        const date = (action.begin) ? action.begin : new Date()
        let begin, end
        if (action.typeIntervalTime === 0) {
            [begin, end] = countWeekInterval(date)
        } else {
            [begin, end] = countMountInterval(date)
        }
        dispatch(StatisticsActions.setInterval(begin, end))

        await  requestStatistics(begin, end, dispatch)

    },

    STATISTICS__SHIFT_INITIAL_LIFT : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        let [ begin, end ] = shiftInterval(action.begin, action.end, action.typeIntervalTime, -1)
        dispatch(StatisticsActions.setInterval(begin, end))
        await  requestStatistics(begin, end, dispatch)
    },

    STATISTICS__SHIFT_INITIAL_RIGHT : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        let [ begin, end ] = shiftInterval(action.begin, action.end, action.typeIntervalTime, 1)
        dispatch(StatisticsActions.setInterval(begin, end))
        await  requestStatistics(begin, end, dispatch)
    },
}

const countWeekInterval = (date : Date) => {
    const dayWeek = date.getDay()
    let firstDay
    if (dayWeek === 0) firstDay = date.getDate() - 6
    else firstDay = date.getDate() - dayWeek + 1
    const lastDay = firstDay + 6

    let begin, end

    begin = new Date(date.getFullYear(), date.getMonth(), firstDay)
    end =  new Date(date.getFullYear(), date.getMonth(), lastDay)
    return [begin, end]
}

const countMountInterval = (date : Date) => {
    const begin = new Date(date.setDate(1))
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const end = new Date(date.setDate(lastDay))
    return [begin, end]
}

const shiftInterval = (begin : Date,
                       end : Date,
                       typeIntervalTime : typeIntervalTime,
                       mod : 1 | -1) => {

    if (typeIntervalTime === 0) {
        begin.setDate(begin.getDate() + (7 * mod))
        end.setDate(end.getDate() + (7 * mod))
    }
    else {
        const m = begin.getMonth() + (1 * mod)
        begin.setMonth(m)
        begin.setDate(1)
        const lastDay = new Date(begin.getFullYear(), m + 1, 0).getDate()
        end = new Date(begin)
        end.setDate(lastDay)
    }
    return [begin, end]
}

const requestStatistics = async (begin : Date, end : Date, dispatch : any) => {
    try {let res : apiResponse<Array<IStatisticsDay | null>>
    res = await api.user.getStatisticsUser(begin, end)

    if (res.data.data && res.data.code === 200) {
        const statistics = res.data.data
        dispatch(StatisticsActions.setStatistics(statistics))
        dispatch(StatisticsActions.setLoading(false))
    }
    }
    catch (e) {
        dispatch(StatisticsActions.setLoading(false, true))
        console.log(e)
    }

}

const statisticsTest = [
    null,
    { time: 1, balls: 95, passedExercises: 1 },
    null,
    null,
    { time: 4, balls: 110, passedExercises: 3 },
    { time: 2, balls: 50, passedExercises: 4 },
    null
]
