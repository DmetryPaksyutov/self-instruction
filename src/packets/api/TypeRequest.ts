import {AxiosResponse} from "axios";

export interface IBodyResponse<D> {
    code : number,
    data : D | null,
    fullError : string,
    errors : {
        location : string,
        fullError : string,
        msg : string,
    },
}
export type apiResponse<I> = AxiosResponse<IBodyResponse<I>>

export interface IUserLogin {
    username : string,
    avatar : any,
    email : string,
    id : string,
    token : string,
}

export interface ICourseInfo {
    name : string,
    img : string,
    description : string,
    category : string,
    id : string,
    percent : number,
}

export interface ICourse {
    name : string,
    lessons : ILesson[],
    tests : ITest[],
}

export interface ILesson {
    id : string,
    name : string,
    description : string,
    img : string,
    exercises : IExerciseInfo[],
}

export interface IExerciseInfo {
    name : string,
    number : number,
    percent : number,
    balls : number
}

export interface ITest {

}

export interface IExercise {
    name : string,
    number : number,
    theory : string,
    materials : IMaterial[],
    words : IMaterial[],
    progress : progressItem[][],
    balls : number,
    percent : number,
    maxBalls : number,
}

export interface IMaterial {
    proposal : string,
    proposalRus : string,
    audio : string,
}

export type progressItem = 'no' | 'yes' | 'err'

export interface IStatisticsDay {
    time : number,
    balls : number,
    passedExercises: number
}

export interface IDictionaryPage {
    words : IMaterial[],
    dictionarySize : number,
}
