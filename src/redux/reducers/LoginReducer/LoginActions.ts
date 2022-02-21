import {apiResponse, IUserLogin} from "../../../packets/api/TypeRequest";
import {AppThunk, InferValueTypes} from "../../store";
import {api} from "../../../packets/api";

export const LoginActions = {
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
export type LoginActionsType = ReturnType<InferValueTypes<typeof LoginActions>>

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
            dispatch(LoginActions.loginAccount(user, token))
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
            dispatch(LoginActions.loginAccount(user, token))
        }
    } catch {
        console.log('ошибка при запросе')
    }
}