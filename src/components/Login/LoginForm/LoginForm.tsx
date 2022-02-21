import React from 'react'
import { Field, InjectedFormProps, reduxForm }from 'redux-form'
import {useDispatch} from 'react-redux'
import {maxLength15, menLength6, notValue, ValidatorType} from '../Validators'
import {loginThunk} from '../../../redux/reducers/LoginReducer/LoginActions'

import {Input} from '../Input/Input'

import st from '../Form.module.scss'


interface IProps {

}

export interface ILoginFormData {
    email : string,
    password : string
}

const Login = (props : IProps & InjectedFormProps<ILoginFormData & IProps>) => {
    const dispatch = useDispatch()

    const onSubmit = (values : ILoginFormData) => {
        dispatch(loginThunk(values.email, values.password))
    }

    const emailValidators : ValidatorType[] = [notValue]
    const passwordValidators : ValidatorType[] = [notValue, menLength6, maxLength15]

    return <div >
        <form  onSubmit={props.handleSubmit(onSubmit)} className={st.form}>
            <div><label >Email</label><br/>
                <Field
                    id={'email'}
                    name={'email'}
                    type={'email'}
                    component={Input}
                    validate={emailValidators}
                />
            </div>
            <div><label >Пароль</label><br/>
                <Field
                    id={'password'}
                    name={'password'}
                    type={'password'}
                    component={Input}
                    validate={passwordValidators}
                />
            </div>
            <div className={st.form__button}><button >Войти</button></div>
        </form>
    </div>
}

export const LoginForm = reduxForm<ILoginFormData, IProps>({form: 'Login'})(Login)