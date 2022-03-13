import {apiResponse, IUserLogin} from "../../../packets/api/TypeRequest";
import {AppThunk, InferValueTypes} from "../../store";
import {api} from "../../../packets/api";
import {storage} from '../../../packets/storage'

export const LoginActions = {
    loginAccount ( user : IUserLogin ) {
        return {
            type: 'LOGIN__LOGIN_ACCOUNT' as const,
            user
        }
    },
    logoutAccount () {
        localStorage.removeItem('jwt')
        return {type: 'LOGIN__LOGOUT_ACCOUNT' as const}
    },
    updateAccount () {
        return {type: 'LOGIN__UPDATE_ACCOUNT' as const}
    },

    setUsername (username : string) {
        return {
            type: 'LOGIN__SET_USERNAME' as const,
            username
        }
    },

    setEmail (email : string) {
        return {
            type: 'LOGIN__SET_EMAIL' as const,
            email
        }
    }
}
export type LoginActionsType = ReturnType<InferValueTypes<typeof LoginActions>>

type LoginThunk = AppThunk<LoginActionsType>

type loginResult = apiResponse<IUserLogin>
export const registrationThunk =  (email : string,
                                   username : string,
                                   password : string) : LoginThunk  => async dispatch  => {
    try {
        const res: loginResult = await api.auth.registration(email, username, password)
        if (res.data.code === 200) {
            const user = res.data.data
            if (user) {
                const {token} = user
                storage.jwtStorage.set(token)
                storage.userStorage.set(user.username, user.email, user.avatar, user.id)
                dispatch(LoginActions.loginAccount(user))
            }
        }
    } catch {
        console.log('ошибка при запросе')
    }

}

export const loginThunk = (email : string,
                           password : string) : LoginThunk => async dispatch => {
    try {
        const res : loginResult = await api.auth.login(email, password)
        if (res.data.code === 200) {
            const user = res.data.data

            if (!user) {
                console.log('not data')
                return null
            }

            const {token} = user
            storage.jwtStorage.set(token)
            storage.userStorage.set(user.username, user.email, user.avatar, user.id)
            dispatch(LoginActions.loginAccount(user))


        }
    } catch (e) {
        console.log(e)
    }
}