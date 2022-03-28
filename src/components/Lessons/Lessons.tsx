import React, {useEffect} from 'react'
import {useReducerAsync} from 'use-reducer-async'
import {initialLessonsState, LessonsAsyncActions, LessonsReducer} from './LessonsReducer'
import {useAppSelector} from '../../packets/hooks'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {UserWorkActions} from '../../redux/reducers/UserWork/UserWorkActions'

import {Lesson} from './Lesson/Lesson'
import {Loading} from '../common/Loading/Loading'

import st from './Lessons.module.scss'

export const Lessons : React.FC = () => {
    const { id } = useParams()
    const isLogin = useAppSelector( state => state.login.isLogin)
    const [state, dispatch] = useReducerAsync(LessonsReducer, initialLessonsState, LessonsAsyncActions)
    const appDispatch = useDispatch()

    const {isLoading, lessons, name, tests} = state

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

    useEffect(() => {
        appDispatch(UserWorkActions.setExtremeExercises(lessons))
    }, [state.lessons])

    let lessonsList : undefined | JSX.Element[]
    if (state.lessons.length) {
        lessonsList = lessons.map( (lesson, index) => <Lesson lesson={lesson} test={tests[index]} key={lesson.id}/>)
    }

    if (!id) return <div><label>id not find</label></div>

    if (isLoading) return <Loading/>

    return <div>
        <div className={st.lessons__header}><label>{name}</label></div>
        {lessonsList}
    </div>
}