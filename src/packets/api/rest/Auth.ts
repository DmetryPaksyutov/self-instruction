import {anyRequest} from '../anyRequest'

const baseUrl = 'auth'
export const auth = {
    async registration (email : string,
                      username : string,
                      password : string)  {
        return anyRequest('post', `${baseUrl}/registration`, {email, username, password})
    },

    async login (email : string, password : string) {
        return anyRequest('post', `${baseUrl}/login`, {email, password})
    },


}