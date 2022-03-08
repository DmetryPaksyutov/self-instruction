import {anyRequest} from './anyRequest'
import {auth} from './rest/Auth'
import {courses} from './rest/courses'
import {lessons} from './rest/lessons'
import {user} from './rest/user'


export const api = {
    anyRequest: anyRequest,
    auth,
    courses,
    lessons,
    user,
}