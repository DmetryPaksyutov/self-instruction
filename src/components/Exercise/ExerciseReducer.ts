import {InferValueTypes} from "../../redux/store";
import {AnyAction} from "redux";
import {api} from "../../packets/api";
import {apiResponse, IExercise, IMaterial, progressItem} from "../../packets/api/TypeRequest";



export type typeExercise = 0 | 1 | 2 | 3 | 4 | 5

interface IExerciseState {
    name : string,
    number : number,
    theory : string,
    materials : IMaterial[],
    words : IMaterial[],
    progress: progressItem[][],
    balls : number,
    maxBalls : number,

    statusExercises : boolean[],
    isLoading : boolean,
    typeExercise : typeExercise,
    countBall : number,

    isVisibleDictionary : boolean,

}

export const initialExerciseState : IExerciseState = {
    name : '',
    number : 0,
    theory : '',
    materials : [],
    words : [],
    progress : [],
    balls : 0,
    maxBalls : 0,

    statusExercises : [false, false, false, false],
    isLoading : false,
    typeExercise : 0,
    countBall : 0,
    isVisibleDictionary : false,

}

export const ExerciseReducer = (state : IExerciseState, action : ExerciseActionsType) => {
    switch (action.type) {
        case 'EXERCISE__SAVE_EXERCISE' : {
            return {
                ...state,
                name: action.name,
                number: action.number,
                theory: action.theory,
                materials: action.materials,
                words: action.words,
                progress: action.progress,
                balls: action.balls,
                percent: action.percent,
                maxBalls: action.maxBalls,
            }
        }

        case 'EXERCISE__SET_TYPE_EXERCISE' : return {...state, typeExercise : action.typeExercise}

        case 'EXERCISE__SET_LOADING' : return {...state, isLoading : action.isLoading}

        case 'EXERCISE__CREATE_PROGRESS' : return {...state, progress: action.progress}

        case 'EXERCISE__CLEAR_PROGRESS' : {
            debugger
            let { progress, statusExercises } = state
            progress[action.index] = action.progress
            statusExercises[action.index] = action.status
            return {...state, progress, statusExercises}
        }

        case 'EXERCISE__SET_PROGRESS' : return {...state, progress: action.progress}

        case 'EXERCISE__SET_BALLS' : {
            let { maxBalls } = state
            return {...state, balls: action.balls, maxBalls }
        }

        case 'EXERCISE__SET_COUNT_BALLS' : return {...state, countBall : action.countBall}


        case 'EXERCISE__SET_VISIBLE_DICTIONARY' : return {...state, 
            isVisibleDictionary : action.isVisibleDictionary
        }

        case 'EXERCISE__SET_STATUS_EXERCISE' : {
            let statusExercises = state.statusExercises
            statusExercises[action.typeExercise] = action.status
            return {...state, statusExercises}
        }

        case 'EXERCISE__SET_STATUS_EXERCISES' : return {...state, statusExercises : action.statusExercises}

        default : return state
    }
}

export const ExerciseActions = {
    saveExercise ( exercise : IExercise) {
        return {
            type : 'EXERCISE__SAVE_EXERCISE' as const, ...exercise,
        }
    },
    setExercise (
                 id : string | undefined,
                 number : number | undefined) {
        return {
            type : 'EXERCISE__SET_EXERCISE' as const,
            id, number
        }
    },

    setLoading (isLoading : boolean) {
        return {
            type : 'EXERCISE__SET_LOADING' as const,
            isLoading,
        }
    },

    setTypeExercise (typeExercise : typeExercise) {
        return {
            type : 'EXERCISE__SET_TYPE_EXERCISE' as const,
            typeExercise,
        }
    },

    createProgress (countMaterials : number,
                    countWords : number) {
        let progress : progressItem[][] = []
        progress.push(new Array)
        for (let j = 0; j < countWords; j++)
            progress[0].push('no')
        for (let i = 1; i < 4; i++) {
            progress.push(new Array)
            for (let j = 0; j < countMaterials; j++)
                progress[i].push('no')
        }

        return {
            type : 'EXERCISE__CREATE_PROGRESS' as const, progress
        }
    },

    clearProgress (index : number, countMaterials : number) {
        let progress : progressItem[] = []
        for (let i = 0; i < countMaterials; i++)
            progress.push('no')
        const status = false
        return {
            type : 'EXERCISE__CLEAR_PROGRESS' as const, progress, index, status
        }
    },

    setProgress (progress : progressItem[][]) {
        return {
            type : 'EXERCISE__SET_PROGRESS' as const,
            progress
        }
    },

    setStatusExercise (typeExercise : typeExercise, status : boolean) {
        return {
            type : 'EXERCISE__SET_STATUS_EXERCISE' as const,
            typeExercise, status
        }
    },

    countBalls (newCountBall : number, countBall : number, balls : number) {
        return {
            type : 'EXERCISE__COUNT_BALLS' as const,
            newCountBall, countBall, balls
        }
    },

    setBalls (balls : number) {
        return {
            type : 'EXERCISE__SET_BALLS' as const,
            balls
        }
    },

    setCountBalls (countBall : number) {
        return {
            type : 'EXERCISE__SET_COUNT_BALLS' as const,
            countBall
        }
    },

    setIsVisibleDictionary (isVisibleDictionary : boolean) {
        return {
            type : 'EXERCISE__SET_VISIBLE_DICTIONARY' as const,
            isVisibleDictionary
        }
    },

    updateDictionary (words : IMaterial[]) {
        return {
            type : 'EXERCISE__UPDATE_DICTIONARY' as const,
            words
        }
    },

    updateStatistic (idLesson : string,
                     numberExercise : number,
                     progress : progressItem[][],
                     balls : number,
                     minutes : number) {
        return {
            type : 'EXERCISE__UPDATE_STATISTIC_USER' as const,
            idLesson, numberExercise, progress, balls, minutes
        }
    },

    setStatusExercises (statusExercises : boolean[]) {
        return {
            type : 'EXERCISE__SET_STATUS_EXERCISES' as const,
            statusExercises,
        }
    },
}
type ExerciseActionsType = ReturnType<InferValueTypes<typeof ExerciseActions>>


type objDispatch = {  dispatch : any }
export const ExerciseAsyncActions = {
    EXERCISE__SET_EXERCISE : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        try {
            const {id, number} = action
            let res : apiResponse<IExercise> | null
            if (id && number) {
                dispatch(ExerciseActions.setLoading(true))

                res = await api.lessons.getExercise(id, number)
                const exercise = res.data.data

                if (!exercise) {
                    console.log('not data')
                    return
                }

                dispatch(ExerciseActions.saveExercise(exercise))

                if (!exercise.progress.length)
                    dispatch(ExerciseActions.createProgress(
                        exercise.materials.length,
                        exercise.words.length,
                    ))

                let statusExercises : boolean[] = []
                for (let i = 0; i < exercise.progress.length; i ++) {
                    let count = 0
                    for (let j = 0; j < exercise.progress[i].length; j++) {
                        if (exercise.progress[i][j] === 'yes') count++
                    }
                    if (count === exercise.progress[i].length)
                        statusExercises.push(true)
                    else statusExercises.push(false)
                }
                dispatch(ExerciseActions.setStatusExercises(statusExercises))

                dispatch(ExerciseActions.setLoading(false))
            
            }

        }
        catch (e) {
            console.log(e)
        }
    },

    EXERCISE__COUNT_BALLS : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        const {newCountBall, balls, countBall} = action
        let newBalls = balls + newCountBall
        if (newBalls < 0) newBalls = 0
        dispatch(ExerciseActions.setBalls(newBalls))
        dispatch(ExerciseActions.setCountBalls(newCountBall + countBall))
        setTimeout( () => {
            dispatch(ExerciseActions.setCountBalls(0))
            dispatch(ExerciseActions.setCountBalls(0))
        }, 1000)
    },

    EXERCISE__UPDATE_STATISTIC_USER :  ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        try {
            let res : apiResponse<boolean> | null
            const {idLesson, numberExercise, progress, balls, minutes} = action
            res = await api.user.putUpdateStatistic(idLesson, numberExercise, progress, balls, minutes)
            if (res) console.log('update data')
        }
        catch (e) {
            console.log(e)
        }
    },

    EXERCISE__UPDATE_DICTIONARY : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        let words = action.words
        if (words.length) await api.user.putUpdateDictionary(words)
        dispatch(ExerciseActions.setIsVisibleDictionary(false))
    }
}

const exerciseTest = {
                    balls: 0,
                    materials: [
                        {proposal: 'i am', proposalRus: 'я есть', audio: ''},
                        {proposal: 'i am a student', proposalRus: 'я студент', audio: ''},
                        {proposal: 'i am a manager', proposalRus: 'я менеджер', audio: '../testAudio/i_am_a_manager.mp3'},
                        {proposal: 'i am a doctor', proposalRus: 'я доктор', audio: '../testAudio/i_am_a_doctor.mp3'},
                    ],
                    name: "Я есть",
                    number: 1,
                    progress: [],
                    percent: 0,
                    theory: "",
                    words: [
                        {proposal: 'i', proposalRus: 'я', audio: ''},
                        {proposal: 'student', proposalRus: 'студент', audio: ''},
                        {proposal: 'manager', proposalRus: 'менеджер', audio: ''},
                        {proposal: 'doctor', proposalRus: 'доктор', audio: ''},
                    ],

                }