import {getItem, setItem, removeItem, clear} from './storage'
import {jwtStorage} from './adapters/jwtStorage'
import {userStorage} from './adapters/userStorage'

export const storage = {
    getItem,
    setItem,
    removeItem,
    clear,
    jwtStorage,
    userStorage,
}