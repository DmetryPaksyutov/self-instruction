import {InferValueTypes} from "../../redux/store";
import {AnyAction} from "redux";
import {api} from "../../packets/api";
import {apiResponse, IExercise, IMaterial, progressItem} from "../../packets/api/TypeRequest";

export type typeExercise = 0 | 1 | 2 | 3 | 4

interface IExerciseState {
    name: string,
    number: number,
    theory: string,
    materials : IMaterial[],
    words: IMaterial[],
    progress: progressItem[][],
    balls: number,
    percent: number,

    typeExercise: typeExercise,
    countBall: number,
}

export const initialExerciseState : IExerciseState = {
    name: '',
    number: 0,
    theory: '',
    materials : [],
    words: [],
    progress: [],
    balls: 0,
    percent : 0,

    typeExercise: 0,
    countBall: 0,

}

export const ExerciseReducer = (state : IExerciseState, action : ExerciseActionsType) => {
    switch (action.type) {
        case 'EXERCISE__SAVE_EXERCISE' : return {...state,
            name : action.name,
            number: action.number,
            theory: action.theory,
            materials : action.materials,
            words: action.words,
            progress: action.progress,
            balls: action.balls,
            percent : action.percent,
        }

        case 'EXERCISE__SET_TYPE_EXERCISE' : return {...state, typeExercise : action.typeExercise}

        case 'EXERCISE__CREATE_PROGRESS' : return {...state, progress: action.progress}

        case 'EXERCISE__SET_PROGRESS' : return {...state, progress: action.progress}

        case 'EXERCISE__SET_BALLS' : return {...state, balls: action.balls }

        case 'EXERCISE__SET_COUNT_BALLS' : return {...state, countBall : action.countBall}

        default : return state
    }
}

export const ExerciseActions = {
    saveExercise ( exercise : IExercise) {
        return {
            type : 'EXERCISE__SAVE_EXERCISE' as const, ...exercise,
        }
    },
    setExercise (isLogin : boolean,
                 id : string | undefined,
                 number : number | undefined) {
        return {
            type : 'EXERCISE__SET_EXERCISE' as const,
            isLogin, id, number
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
    setProgress (progress : progressItem[][]) {
        return {
            type : 'EXERCISE__SET_PROGRESS' as const,
            progress
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
}
type ExerciseActionsType = ReturnType<InferValueTypes<typeof ExerciseActions>>


type objDispatch = {  dispatch : any }
export const ExerciseAsyncActions = {
    EXERCISE__SET_EXERCISE : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        try {
            const {id, number} = action
            let res : apiResponse<IExercise> | null
            if (action.isLogin && id && number) {
                //res = await api.lessons.getExercise(id, number)
                //const exercise = res.data.data
                const exercise = {
                    balls: 0,
                    materials: [
                        {proposal: 'i am', proposalRus: 'я есть', audio: ''},
                        {proposal: 'i am a student', proposalRus: 'я студент', audio: ''},
                        {proposal: 'i am a manager', proposalRus: 'я менеджер', audio: ''},
                        {proposal: 'i am a doctor', proposalRus: 'я доктор', audio: ''},
                    ],
                    name: "Я есть",
                    number: 1,
                    progress: [],
                    percent: 0,
                    theory: "",
                    words: [],
                }
                dispatch(ExerciseActions.saveExercise(exercise))

                if (!exercise.progress.length)
                    dispatch(ExerciseActions.createProgress(
                        exercise.materials.length,
                        exercise.words.length,
                    ))
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
        setInterval( () => {
            dispatch(ExerciseActions.setCountBalls(0))
        }, 1000)
    },
}