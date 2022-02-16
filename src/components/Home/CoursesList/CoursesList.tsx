import React from 'react'
import { ICourseInfo } from '../../../packets/api/TypeRequest'

import {Course} from './Course/Course'

import st from './CoursesList.module.scss'


interface IProps {
    title : string,
    courses : ICourseInfo[]
}

export const CoursesList : React.FC<IProps> = ({ title, courses}) => {
    let coursesList : undefined | JSX.Element[]
    if (courses && courses.length) coursesList = courses.map( (course) => <Course course={course} key={course.id}/>)

    return <div className={st.coursesList}>
        <div className={st.coursesList__title}><label>{title}</label></div>
        <div className={st.coursesList__list}>{coursesList}</div>
    </div>
}