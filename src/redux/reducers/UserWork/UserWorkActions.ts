import { InferValueTypes } from '../../store'
import { AppThunk } from '../../store'
import { storage } from '../../../packets/storage'
import {extremeExerciseType, settingsDailyPlanType} from './UserWorkReducer'
import {ILesson} from "../../../packets/api/TypeRequest";

export const UserWorkActions = {
    setTimeAndSating (timeWork : number,
                      settingsDailyPlan : settingsDailyPlanType,
                      percent : number
                      ) {
        return {
            type : 'USER_WORK__SET_TIME_AND_SETTINGS' as const,
            timeWork, settingsDailyPlan, percent
        }
    },
    setSating (settingsDailyPlan : settingsDailyPlanType) {
        return {
            type : 'USER_WORK__SET_SETTINGS' as const,
            settingsDailyPlan
        }
    },
    setTime (minutes : number) {
        return {
            type : 'USER_WORK__SET_TIME' as const,
            timeWork : minutes
        }
    },
    setMinutes (minutes : number) {
        return {
            type : 'USER_WORK__SET_MINUTES' as const,
            minutes,
        }
    },

    setExtremeExercises (lessons : ILesson[]) {
        const extremeExercises : extremeExerciseType[] = lessons.map((lesson) => {
            return {
                id : lesson.id,
                numberExercise : lesson.exercises[lesson.exercises.length - 1].number,
            }
        })
        return {
            type : 'USER_WORK__SET_EXTREME_EXERCISES' as const,
            extremeExercises,
        }
    }
}

export type UserWorkActionsType = ReturnType<InferValueTypes<typeof UserWorkActions>>

type UserWorkThunk = AppThunk<UserWorkActionsType>

export const initialTimeThunk = () : UserWorkThunk => async dispatch => {
    try {
        
        const  settingsDailyPlan = storage.dailyPlanStorage.getSettingsDailyPlan()
        let timeWork = storage.dailyPlanStorage.getTimeWork()
        let percent = 0
        if (!timeWork) timeWork = 0
        if (timeWork) percent = Math.round(timeWork * 100 / settingsDailyPlan)
        dispatch(UserWorkActions.setTimeAndSating(timeWork, settingsDailyPlan, percent))
        
    }
    catch (e) {
        console.log('error initial time')
        dispatch(UserWorkActions.setSating(15))
    }
}

export const updateTimeThunk = (minutes : number) : UserWorkThunk => async dispatch => {
    try {
        storage.dailyPlanStorage.setTimeWork(minutes)
        let timeWork = storage.dailyPlanStorage.getTimeWork()
        dispatch(UserWorkActions.setTime(timeWork))
        dispatch(UserWorkActions.setMinutes(0))
    }
    catch (e) {
        console.log(e)
    }
}