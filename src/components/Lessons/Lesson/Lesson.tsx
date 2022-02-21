import React from 'react'
import {ILesson, ITest} from '../../../packets/api/TypeRequest'

import {Exercise} from './Exercise/Exercise'

import st from './Lesson.module.scss'
import arrowImg from '../../../img/arrow.png'


interface IProps {
    lesson : ILesson,
    test : ITest | undefined,
}
export const Lesson : React.FC<IProps> = ( {lesson, test} ) => {
    let exercisesList : undefined | JSX.Element[]
    const id = lesson.id

    if (lesson && lesson.exercises.length) {
        exercisesList = lesson.exercises.map((exercise) => <Exercise {...exercise} id={id} key={exercise.number}/>)
    }


    return <div className={st.lesson}>
        <details className={st.lesson__details}>
            <summary>
                <div className={st.lesson__img}><img src={lesson.img}/></div>
                <div className={st.lesson__name}><label>{lesson.name}</label></div>
                <div className={st.lesson__description}><label>{lesson.description}</label></div>
                <div className={st.lesson__arrow}><img src={arrowImg}/></div>
            </summary>

            <div className={st.lesson__list}>{exercisesList}</div>
        </details>

    </div>
}