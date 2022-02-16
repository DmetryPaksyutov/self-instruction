import {anyRequest} from '../anyRequest'

const baseUrl = 'courses'
export const courses = {
    async getAllCourses () {
        return anyRequest('get', `${baseUrl}/courses`)
    },

    async authGetAllCourses () {
        return anyRequest('get', `${baseUrl}/authCourses`, {}, true)
    },
}