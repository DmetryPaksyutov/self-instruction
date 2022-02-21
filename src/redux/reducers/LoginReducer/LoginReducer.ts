import {storage} from '../../../packets/storage'
import {LoginActionsType} from './LoginActions'

export interface ILoginState {
    isLogin : boolean
    username : string | null
    avatar : any | null
    email : string | null
    id : string | null
}
const initialState : ILoginState = {
    isLogin: false,
    username : null,
    avatar: null,
    email : null,
    id : null,
}

export const LoginReducer = (state: ILoginState = initialState, action: LoginActionsType): ILoginState => {
    switch (action.type) {
        case 'LOGIN__LOGIN_ACCOUNT' :
            const {username, email, avatar, id} = action.user
            storage.jwtStorage.set(action.token)
            storage.userStorage.set(username, email, avatar, id)
            return {...state, isLogin: true, avatar, username, email, id}
        case 'LOGIN__LOGOUT_ACCOUNT' :
            storage.clear()
            return {...state, isLogin: false, avatar: null, username: null, email: null, id: null}
        case 'LOGIN__UPDATE_ACCOUNT' :
            if (storage.jwtStorage.get()) {
                const {username, email, avatar, id} = storage.userStorage.get()
                return {...state, email, username, avatar, id, isLogin: true,}
            }
            return state

        default:
            return state;
    }
};

