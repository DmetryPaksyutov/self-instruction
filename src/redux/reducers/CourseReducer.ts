import {InferValueTypes} from '../store'

interface ICourseState {
    dailyPlan : any,
}

const initialCourseState : ICourseState = {
    dailyPlan : 0,
}

export const CourseReducer = (state = initialCourseState, action : CourseActionsType) => {
    switch (action.type) {

        default : return state
    }
}

export const CourseActions = {
    setCourse (courseName : string) {
        return {
            type : 'COURSE__SET_COURSE' as const,
            courseName,
        }
    }
}
type CourseActionsType = ReturnType<InferValueTypes<typeof CourseActions>>