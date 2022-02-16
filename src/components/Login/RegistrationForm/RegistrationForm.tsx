import React from 'react'
import {
    isEmail,
    isPasswordRedo,
    maxLength10,
    maxLength15,
    menLength4,
    menLength6,
    notValue,
    ValidatorType
} from '../Validators'
import { Field, InjectedFormProps, reduxForm} from 'redux-form'
import {useDispatch} from 'react-redux'

import {Input} from '../Input/Input'

import st from '../Form.module.scss'
import {registrationThunk} from "../../../redux/reducers/LoginReducer";

const Registration = (props : IProps & InjectedFormProps<IRegFormData, IProps>) => {
    const dispatch = useDispatch()

    const onSubmit = (values : IRegFormData) => {
        dispatch(registrationThunk(values.email, values.username, values.password))
    }

    const usernameValidators : ValidatorType[] = [notValue, menLength4, maxLength10]
    const passwordValidators : ValidatorType[] = [notValue, menLength6, maxLength15]
    const emailValidators : ValidatorType[] = [notValue, isEmail]

    return <div >
        <form onSubmit={props.handleSubmit(onSubmit)} className={st.form}>
            <div>
                <label >Email</label><br/>
                <Field
                    id={'email'}
                    name={'email'}
                    type={'email'}
                    component={Input}
                    validate={emailValidators}
                />
            </div>
            <div><label >Логин</label><br/>
                <Field
                    id={'username'}
                    name={'username'}
                    component={Input}
                    validate={usernameValidators}
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
            <div><label >Потверджение пароля</label><br/>
                <Field
                    id={'passwordRedo'}
                    name={'passwordRedo'}
                    type={'password'}
                    component={Input}
                    validate={passwordValidators}
                />
            </div>
            <div className={st.form__button} ><button>Завести акаунт</button></div>
        </form>
    </div>
}

export interface IRegFormData {
    email : string
    username : string
    password : string
    passwordRedo : string
}

interface IProps {

}

export const RegistrationForm = reduxForm<IRegFormData, IProps>({form : 'registration', validate: isPasswordRedo})(Registration)