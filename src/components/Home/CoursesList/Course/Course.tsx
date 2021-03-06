import React from 'react'
import {ICourseInfo} from '../../../../packets/api/TypeRequest'

import {ProgressBar} from '../../../common/ProgressBar/ProgressBar'
import {Link} from 'react-router-dom'

import st from './Course.module.scss'
import stButton from '../../../common/styles/button.module.scss'


interface IProps {
    course : Omit<ICourseInfo, 'category'>,
}

export const Course : React.FC<IProps> = ({ course }) => {
    const textButton = (course.percent === 0 && 'Начать') || (course.percent === 100 && 'Повторить') || 'Продолжить'
    return <div className={st.course}>
        <Link to={`/course/${course.id}`}><div className={st.course__content}>
        <div className={st.course__details}>
            <div className={st.course__description}><label>{course.description}</label></div>
            <div className={st.course__button}>
                <button className={stButton.orangeButton}>{textButton}</button>
            </div>
        </div>
        <div className={st.course__img}><img src={course.img}/></div>

        <div className={st.course__name}><label>{course.name}</label></div>
        <div className={st.course__progressBar}>{(course.percent > 0) && <ProgressBar progress={course.percent}/>}</div>
    </div></Link>
    </div>
}