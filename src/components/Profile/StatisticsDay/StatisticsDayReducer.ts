import {InferValueTypes} from '../../../redux/store'

import { AnyAction } from 'redux'
import {apiResponse, IStatisticsDay} from '../../../packets/api/TypeRequest'
import {api} from '../../../packets/api'

interface IProfileState {
    isLoadingStatisticsDay : boolean,
    time : number,
    balls : number,
    passedExercises: number,
}
export const initialProfileState : IProfileState = {
    isLoadingStatisticsDay : false,
    time : 0,
    balls : 0,
    passedExercises : 0,
}

export const ProfileStatisticsReducer = (state : IProfileState, action : ProfileStatisticsActionsType) => {
    debugger
    switch (action.type) {
        case 'PROFILE__UPDATE_STATISTICS' : return {...state,
            balls : action.balls,
            passedExercises: action.passedExercises,
            time : action.time,
        }

        case 'PROFILE__SET_LOADING' : return {...state, isLoadingStatisticsDay : action.isLoadingStatisticsDay}

        default : return state;
    }
}

type ProfileStatisticsActionsType = ReturnType<InferValueTypes<typeof ProfileStatisticsActions>>
export const ProfileStatisticsActions = {
    updateStatistics (time : number,
                   balls : number,
                   passedExercises : number) {
        return {
            type : 'PROFILE__UPDATE_STATISTICS' as const,
            time, balls, passedExercises
        }
    },

    setLoading (isLoadingStatisticsDay : boolean) {
        return {
            type : 'PROFILE__SET_LOADING' as const,
            isLoadingStatisticsDay
        }
    },

    setStatistics () {
        return {
            type : 'PROFILE__SET_STATISTICS' as const
        }
    }

}

type objDispatch = {  dispatch : any }
export const ProfileStatisticsAsyncActions = {
    PROFILE__SET_STATISTICS : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        debugger
        try {
            dispatch(ProfileStatisticsActions.setLoading(true))
            let res : apiResponse<Array<IStatisticsDay | null>>
            const date = new Date()
            res = await api.user.getStatisticsUser(date, date)
            if (res.data.data && res.data.data[0]) {
                const statistics = res.data.data[0]
                const {time, balls, passedExercises} = {...statistics}
                dispatch(ProfileStatisticsActions.updateStatistics(time, balls, passedExercises))
            }
            dispatch(ProfileStatisticsActions.setLoading(false))
        }
        catch (e) {
            dispatch(ProfileStatisticsActions.setLoading(false))
            console.log(e)
        }
    },
}
