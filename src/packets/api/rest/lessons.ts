import {anyRequest} from '../anyRequest'

const baseUrl = 'lessons'
export const lessons = {
    async getCourse (id : string) {
        return anyRequest('get', `${baseUrl}/course`, {id})
    },

    async authGetCourse (id : string) {
        return anyRequest('get', `${baseUrl}/authCourse`, {id}, true)
    },

    async getExercise(id : string, number : number) {
        return anyRequest('get', `${baseUrl}/exercise`, {id, number}, true)
    }
}