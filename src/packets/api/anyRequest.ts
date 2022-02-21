import axios from 'axios'
import {storage} from '../storage'

export const anyRequest = async (
    method : 'get' | 'post' | 'put' | 'delete',
    url : string,
    data : any = {},
    isJwt : boolean = false,
    headers : any = {},
) => {
    const jwt = storage.jwtStorage.get()
    if (isJwt) headers.Authorization = `Bearer ${jwt}`
    url = `http://127.0.0.1:8080/api/${url}`

    let config = {}
    switch (method) {
        case "get":
            config = {
                params : {...data},
                headers
            }
            return axios.get(url, config)
        case "post":
            config = {
                headers
            }
            return axios.post(url, data, config)
        case "put": return axios.put(url)
        case "delete":return axios.delete(url)
    }
}