import {AxiosResponse} from "axios";

export interface IBodyResponse<D> {
    code : number,
    data : D,
    fullError : string,
    errors : {
        location : string,
        fullError : string,
        msg : string,
    },
}
export type apiResponse<I> = AxiosResponse<IBodyResponse<I>>

export interface IUserLogin {
    username: string,
    avatar: any,
    email: string,
    id: string,
    token: string,
}

export interface ICourseInfo {
    name : string,
    img : string,
    description : string,
    category : string,
    id : string,
    progress : number,
}

export interface ICourse {
    lessons : ILesson[],
    tests : ITest[],
}

export interface ILesson {
    id : string,
    name : string,
    description : string,
    exercises : IExerciseInfo[],
}

export interface IExerciseInfo {
    name: string,
    number: number,
    progress: number,
    balls: number
}

export interface ITest {

}

