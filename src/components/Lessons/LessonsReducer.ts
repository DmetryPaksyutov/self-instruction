import {InferValueTypes} from "../../redux/store";
import {AnyAction} from "redux";
import {api} from "../../packets/api";
import {ILesson, apiResponse, ICourse} from "../../packets/api/TypeRequest";


interface ILessonsState {
    lessons : ILesson[],
    tests : any[],
    name : string,
    isLoading : boolean,
}

export const initialLessonsState : ILessonsState = {
    lessons : [],
    tests : [],
    name : '',
    isLoading : false,
}

export const LessonsReducer = (state : ILessonsState, action : LessonsActionsType) => {
    switch (action.type) {
        case "LESSONS__SAVE_COURSE" : {
            return {...state,
                lessons : action.course.lessons,
                tests : action.course.tests,
                name : action.course.name,
            }
        }

        case 'LESSONS__SET_LOADING' : return {...state, isLoading : action.isLoading}

        default : return state
    }
}

export const LessonsActions = {
    setCourse ( course : ICourse) {
        return {
            type : 'LESSONS__SAVE_COURSE' as const, course,
        }
    },

    setLoading (isLoading : boolean) {
        return {
            type : 'LESSONS__SET_LOADING' as const, isLoading,
        }
    }
}
type LessonsActionsType = ReturnType<InferValueTypes<typeof LessonsActions>>


type objDispatch = {  dispatch : any }
export const LessonsAsyncActions = {
    LESSONS__SET_COURSE : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        try {
            //debugger
            dispatch(LessonsActions.setLoading(true))
            let res : apiResponse<ICourse> | null
            if (action.isLogin) {
                res = await api.lessons.authGetCourse(action.id)
            }
            else {
                res = await api.lessons.getCourse(action.id)
            }
            const course = res.data.data
            if (course) {
                dispatch(LessonsActions.setCourse(course))
            }
            dispatch(LessonsActions.setLoading(false))

        }
        catch (e) {
            console.log(e)
            dispatch(LessonsActions.setLoading(false))
        }
    },
}

const courseTest =  {
                name : '4 С нуля - Beginner',
                lessons: [
                {
                    name: "Глагол to be - Present Simple (настоящее простое), единственное число",
                    description: "Короткие фразы с глаголом to be в форме единственного числа настоящего времени.",
                    id: "620a94b412d63b3f536c48f9",
                    img: "https://d2y1pz2y630308.cloudfront.net/5112/pictures/2015/11/1-1.jpg",
                    exercises: [
                        {
                            name: "Я есть",
                            number: 1,
                            progress: 0,
                            balls: 0
                        },
                        {
                            name: "Он есть",
                            number: 2,
                            progress: 0,
                            balls: 0
                        },
                        {
                            name: "Она есть",
                            number: 3,
                            progress: 0,
                            balls: 0
                        },
                        {
                            name: "Я не ...",
                            number: 4,
                            progress: 0,
                            balls: 0
                        }
                    ]
                },
                {
                    name: "Глагол to be - Present Simple (настоящее простое), множественное число",
                    description: "Короткие фразы с глаголом to be в форме множественного числа настоящего времени.",
                    id: "620a94b412d63b3f536c48fb",
                    img: "https://d2y1pz2y630308.cloudfront.net/5112/pictures/2015/11/1-1.jpg",
                    exercises: [
                        {
                            name: "Мы есть",
                            number: 5,
                            progress: 0,
                            balls: 0
                        }
                    ]
                }
            ],
                tests: []
        }