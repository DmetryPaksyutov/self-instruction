import React from 'react'
import st from './Input.module.scss'

interface IInputProps {
    meta : {
        error : string,
        touched : boolean,
    },
    input : any,
    type : string,
}
export const Input : React.FC<IInputProps> = ({meta, input, type = 'text' }) => {
    const isError = meta.touched && meta.error;
    return <div>
        <input className={`${st.input} ${(isError) && st.input_error}`} type={type} {...input}/>
    {(isError) && <label className={st.textError}>{meta.error}</label>}
        </div>

    }