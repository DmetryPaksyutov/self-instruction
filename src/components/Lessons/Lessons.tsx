import React, {useEffect} from 'react'

import {useParams} from 'react-router-dom'

import st from './Lessons.module.scss'
import {useReducerAsync} from "use-reducer-async";
import {initialLessonsState, LessonsAsyncActions, LessonsReducer} from "./LessonsReducer";
import {useAppSelector} from "../../packets/hooks";
import {Lesson} from "./Lesson/Lesson";


export const Lessons : React.FC = () => {
    const { id } = useParams()
    const isLogin = useAppSelector( state => state.login.isLogin)
    const [state, dispatch] = useReducerAsync(LessonsReducer, initialLessonsState, LessonsAsyncActions)

    useEffect(() => {
        if (id) {
            const action = {
                type : 'LESSONS__SET_COURSE' as const,
                id,
                isLogin,
            }
            dispatch(action)
        }
    }, [isLogin])

    let lessonsList : undefined | JSX.Element[]
    if (state.lessons.length) {
        lessonsList = state.lessons.map( (lesson, index) => <Lesson lesson={lesson} test={state.tests[index]}/>)
    }

    return <div>
        {lessonsList}
    </div>
}