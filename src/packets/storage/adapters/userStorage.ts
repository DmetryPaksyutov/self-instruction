import {getItem, setItem} from '../storage'

const get = () => {
    const username = getItem('username')
    const email = getItem('email')
    const avatar = getItem('avatar')
    const id = getItem('id')
    const user = {username, email, avatar, id}
    return user
}

const set = (username: string,
             email: string,
             avatar: string,
             id: string ) => {
    setItem('username', username)
    setItem('email', email)
    setItem('avatar', avatar)
    setItem('id', id)
}

export const userStorage = {get, set}