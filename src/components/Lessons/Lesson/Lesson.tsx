import React from 'react'
import {ILesson, ITest} from "../../../packets/api/TypeRequest";

import st from './Lesson.module.scss'
import {Exercise} from "./Exercise/Exercise";

interface IProps {
    lesson : ILesson,
    test : ITest | undefined,
}
export const Lesson : React.FC<IProps> = ( {lesson, test} ) => {
    let exercisesList : undefined | JSX.Element[]
    if (lesson && lesson.exercises.length) {
        exercisesList = lesson.exercises.map((exercise) => <Exercise {...exercise}/>)
    }

    return <div>

        {exercisesList}
    </div>
}