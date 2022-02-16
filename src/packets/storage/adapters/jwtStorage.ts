import {getItem, setItem} from '../storage'

const get = () => getItem('jwt')
const set = (jwt : string) => {
    setItem('jwt', jwt)
}

export const jwtStorage = {get, set}
