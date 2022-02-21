import {InferValueTypes} from "../../redux/store";
import {AnyAction} from "redux";
import {api} from "../../packets/api";
import {apiResponse, IExercise, IMaterial, progressItem} from "../../packets/api/TypeRequest";


interface IExerciseState {
    name: string,
    number: number,
    theory: string,
    materials : IMaterial[],
    words: IMaterial[],
    progress: progressItem[][],
    balls: number,
    percent : number,

    status : number,
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

    status: 0,

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
    }
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
                        {proposal: 'i am manager', proposalRus: 'я менеджер', audio: ''},
                        {proposal: 'i am doctor', proposalRus: 'я доктор', audio: ''},
                    ],
                    name: "Я есть",
                    number: 1,
                    progress: [],
                    percent: 0,
                    theory: "",
                    words: [],
                }
                dispatch(ExerciseActions.saveExercise(exercise))
            }

        }
        catch (e) {
            console.log(e)
        }
    },
}