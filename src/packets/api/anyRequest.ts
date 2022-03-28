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
    console.log('запрос')
    //url = `http://127.0.0.1:8080/api/${url}`
    url = `https://glacial-lake-85871.herokuapp.com/api/${url}`
    console.log(url)

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
        case "put": {
            config = {
                headers
            }
            return axios.put(url, data, config)
        }
        case "delete":return axios.delete(url)
    }
}