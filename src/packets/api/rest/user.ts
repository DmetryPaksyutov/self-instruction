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
}