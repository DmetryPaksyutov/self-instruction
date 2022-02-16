//import {IRegFormData} from './RegistrationForm/RegistrationForm'
type IRegFormData = any

export type ValidatorType = (value : string) => string | undefined

export const notValue : ValidatorType = (value) => (value) ? undefined : 'поле не должно быть пустым'

const maxLength = (n : number) : ValidatorType => (value) => {if (value.length > n) return `число символов превышает ${n}`};
export const maxLength10 = maxLength(10)
export const maxLength15 = maxLength(15)

const menLength = (n : number) : ValidatorType => (value) => {if (value.length < n) return `число символов меньше ${n}`};
export const menLength4 = menLength(4)
export const menLength6 = menLength(6)

export const isEmail : ValidatorType = (value) =>
    (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'электронная почта некоректна' : undefined

export const isPasswordRedo = (values : IRegFormData) => {
    let errors : {passwordRedo? : string} = {}
    if (values.password != values.passwordRedo) errors.passwordRedo = 'введёные пароли не одинаковы'
    return errors
}


interface IErrorsForm {
    username?: string
    password?: string
}

export const notValue1 = (values : any) => {
    const errors:IErrorsForm = {}
    if(!values.password) {
        errors.password = "Please provide password"
    }
    if(!values.username) {
        errors.username = "Please provide username"
    }
    return errors;
}
