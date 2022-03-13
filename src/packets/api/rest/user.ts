import {anyRequest} from '../anyRequest'
import {IMaterial, progressItem} from "../TypeRequest";

const baseUrl = 'user'
export const user = {
    async putUpdateStatistic (idLesson : string,
                              numberExercise : number,
                              progress : progressItem[][],
                              balls : number,
                              minutes : number) {
        return anyRequest('put', `${baseUrl}/updateStatistic`, {idLesson, numberExercise, progress, balls, minutes}, true)
    },

    async putUpdateDictionary (words : IMaterial[]) {
        return anyRequest('put', `${baseUrl}/updateDictionary`, {words}, true )
    },

    async getStatisticsUser (beginDate: Date, endDate : Date) {
        const begin = {
            day : beginDate.getDate(),
            month : beginDate.getMonth() + 1,
            year : beginDate.getFullYear(),
        }
        const end = {
            day : endDate.getDate(),
            month : endDate.getMonth() + 1,
            year : endDate.getFullYear(),
        }

        return anyRequest('post', `${baseUrl}/statistics`, { begin, end }, true )
    },

   async putUsername (username : string) {
    return anyRequest('put', `${baseUrl}/username`, {username}, true )
   },

   async putEmail (email : string) {
    return anyRequest('put', `${baseUrl}/email`, {email}, true )
   },

    async getDictionary (begin : number, end : number) {
        return  anyRequest('get', `${baseUrl}/dictionary`, {begin, end}, true )
    }
}