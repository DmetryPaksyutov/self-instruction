import {InferValueTypes} from "../../redux/store";
import {AnyAction} from "redux";
import {api} from "../../packets/api";
import {ICourseInfo, apiResponse} from "../../packets/api/TypeRequest";


interface IHomeState {
    courses : ICourseInfo[][],
}

export const initialHomeState : IHomeState = {
    courses : [],
}

export const HomeReducer = (state : IHomeState, action : HomeActionsType) => {
    switch (action.type) {
        case "HOME__SAVE_COURSES" :
            return {...state, courses : action.courses}
        default : return state
    }
}

export const HomeActions = {
    setCourses ( courses : ICourseInfo[][]) {
        return {
            type : 'HOME__SAVE_COURSES' as const, courses,
        }
    }
}
type HomeActionsType = ReturnType<InferValueTypes<typeof HomeActions>>


type objDispatch = {  dispatch : any }
export const HomeAsyncActions = {
    HOME__SET_COURSES : ({ dispatch } : objDispatch ) => async ( action : AnyAction) => {
        try {
            let res : apiResponse<ICourseInfo[]> | null
            if (action.isLogin) {
                res = await api.courses.authGetAllCourses()
            }
            else {
                res = await api.courses.getAllCourses()
            }

            const allCourses = res.data.data

            if (!allCourses) {
                console.log('not data')
                return
            }

            const courses :ICourseInfo[][] = []
            courses[0] = allCourses.filter( (course) => course.category == 'Англиский по уровням')

            dispatch(HomeActions.setCourses(courses))
        }
        catch (e) {
            console.log(e)
        }
    },
}

const allCoursesTest = [
                {
                    category: "Англиский по уровням",
                    description: "По мере прохождения курса вы научитесь понимать, читать и писать простые фразы и предложения",
                    id: "61fdfc6abc9e215d73034dd3",
                    img: "https://d2y1pz2y630308.cloudfront.net/5112/pictures/2015/11/1-1.jpg",
                    name: "С нуля - Beginner",
                    progress: 0},
                {
                    category: "Англиский по уровням",
                    description: "По мере прохождения курса вы научитесь понимать, читать и писать простые фразы и предложения",
                    id: "61fdfc6abc9e215d73034dd3-clon1",
                    img: "https://d2y1pz2y630308.cloudfront.net/5112/pictures/2015/11/1-1.jpg",
                    name: "2 С нуля - Beginner",
                    progress: 10},
                {
                    category: "Англиский по уровням",
                    description: "По мере прохождения курса вы научитесь понимать, читать и писать простые фразы и предложения",
                    id: "61fdfc6abc9e215d73034dd3-clon2",
                    img: "https://d2y1pz2y630308.cloudfront.net/5112/pictures/2015/11/1-1.jpg",
                    name: "3 С нуля - Beginner",
                    progress: 50},
                {
                    category: "Англиский по уровням",
                    description: "По мере прохождения курса вы научитесь понимать, читать и писать простые фразы и предложения",
                    id: "61fdfc6abc9e215d73034dd3-clon3",
                    img: "https://d2y1pz2y630308.cloudfront.net/5112/pictures/2015/11/1-1.jpg",
                    name: "4 С нуля - Beginner",
                    progress: 100}
            ]