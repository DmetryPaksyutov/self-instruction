import React, {useEffect} from 'react'
import {useAppSelector} from '../../packets/hooks'
import {useReducerAsync} from 'use-reducer-async'
import {HomeAsyncActions, HomeReducer, initialHomeState} from './HomeReducer'

import {CoursesList} from './CoursesList/CoursesList'
import {RatingList} from './RatingList/RatingList'
import { HomeDailyPlan } from './HomeDailyPlan/HomeDailyPlan'
import {Loading} from '../common/Loading/Loading'

import st from './Home.module.scss'


export const Home : React.FC = () => {
    const isLogin = useAppSelector( state => state.login.isLogin)
    const [state, dispatch] = useReducerAsync(HomeReducer, initialHomeState, HomeAsyncActions)
    const { courses, isLoading } = state

    useEffect( () => {
        const action = {
            type : 'HOME__SET_COURSES',
            isLogin,
        }
        dispatch(action)
    }, [isLogin])

    if (isLoading) return <Loading/>

    return <div className={st.home}>
        <div className={st.home__dailyPlan}><HomeDailyPlan/></div>
        <div>
           <CoursesList title={'Англиский по уровням'} courses={courses[0]}/>
        </div>
        <div className={st.home__ratingList}><RatingList/></div>
    </div>
}