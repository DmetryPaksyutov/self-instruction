import { UserWorkActionsType } from "./UserWorkActions"

interface IUserWorkState {
    timeWork : number,
    minutes : number,
    settingsDailyPlan : settingsDailyPlanType,
    percent : number,
    extremeExercises : extremeExerciseType[],
}

export type extremeExerciseType = {id : string, numberExercise : number}
export type settingsDailyPlanType = 15 | 30 | 60

const initialUserWorkState : IUserWorkState = {
    settingsDailyPlan : 15,
    minutes : 0,
    timeWork : 0,
    percent : 0,
    extremeExercises : [],
}

export const UserWorkReducer = (state : IUserWorkState = initialUserWorkState, 
    action : UserWorkActionsType
    ) => {
    switch (action.type) {
        case 'USER_WORK__SET_TIME_AND_SETTINGS' : return {...state,  
            settingsDailyPlan : action.settingsDailyPlan,
            timeWork : action.timeWork,
            percent : action.percent
        }

        case 'USER_WORK__SET_SETTINGS' : return {...state, settingsDailyPlan : action.settingsDailyPlan }

        case 'USER_WORK__SET_TIME' : {
            let { settingsDailyPlan } = state
            const percent = Math.round(action.timeWork * 100 / settingsDailyPlan)
            return {...state, timeWork : action.timeWork, percent}
        }

        case 'USER_WORK__SET_MINUTES' : return {...state, minutes : action.minutes}

        case 'USER_WORK__SET_EXTREME_EXERCISES' : return {...state, extremeExercises : action.extremeExercises}

        default : return state
    }
}