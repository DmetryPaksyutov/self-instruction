import {AppThunk, InferValueTypes} from "../store";
import {api} from '../../packets/api'
import {storage} from '../../packets/storage'
import {apiResponse, IUserLogin} from '../../packets/api/TypeRequest'

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

export const LoginReducer  = (state : ILoginState = initialState, action : LoginActionsType): ILoginState => {
    switch (action.type) {
        case 'LOGIN__LOGIN_ACCOUNT' :
            const {username, email, avatar, id} = action.user
            storage.jwtStorage.set(action.token)
            storage.userStorage.set(username,  email, avatar, id)
            return {...state, isLogin: true, avatar, username, email, id}
        case 'LOGIN__LOGOUT_ACCOUNT' :
            storage.clear()
            return {...state, isLogin: false, avatar: null, username: null, email: null, id: null}
        case 'LOGIN__UPDATE_ACCOUNT' :
            if (storage.jwtStorage.get()) {
                const {username, email, avatar, id} = storage.userStorage.get()
                return {...state, email, username, avatar, id, isLogin : true,}
            }
            return state

        default: return state;
    }
}

export const loginActions = {
    loginAccount ( user : IUserLogin, token : string ) {
        return {
            type: 'LOGIN__LOGIN_ACCOUNT' as const,
            user, token
        }
    },
    logoutAccount () {
        localStorage.removeItem('jwt')
        return {type: 'LOGIN__LOGOUT_ACCOUNT' as const}
    },
    updateAccount () {
      return {type: 'LOGIN__UPDATE_ACCOUNT' as const}
    },
}
type LoginActionsType = ReturnType<InferValueTypes<typeof loginActions>>

type LoginThunk = AppThunk<LoginActionsType>

type loginResult = apiResponse<IUserLogin>
export const registrationThunk =  (email : string,
                                  username : string,
                                  password : string) : LoginThunk  => async dispatch  => {
    try {
        const res: loginResult = await api.auth.registration(email, username, password)
        if (res.data.code === 200) {
            const user = {...res.data.data}
            const {token} = user
            dispatch(loginActions.loginAccount(user, token))
        }
    } catch {
        console.log('ошибка при запросе')
    }

}

export const loginThunk = (email : string,
                            password : string) : LoginThunk => async dispatch => {
    try {
        const res: loginResult = await api.auth.login(email, password)
        if (res.data.code === 200) {
            const user = {...res.data.data}
            const {token} = user
            dispatch(loginActions.loginAccount(user, token))
        }
    } catch {
        console.log('ошибка при запросе')
    }
}