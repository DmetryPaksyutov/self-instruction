import React from 'react'
import st from './Theory.module.scss'

interface IProps {
    theory : string
}

export const Theory : React.FC<IProps> = ({ theory }) => {
    return <iframe src={theory} className={st.theory}></iframe>
}