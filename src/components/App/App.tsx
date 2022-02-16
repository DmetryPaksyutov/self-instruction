import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {Navbar} from '../Navbar/Navbar'
import {Footer} from '../Footer/Footer'
import {Login} from '../Login/Login'
import {Home} from '../Home/Home'
import {Lessons} from '../Lessons/Lessons'

import st from './App.module.scss'

export const App : React.FC = () => {

    return <div className={st.body}>
        <Navbar/>
        <div className={`${st.centerBlock} ${st.content}`}>
            <Routes>
                <Route path={'/home'} element={ <Home/> }/>
                <Route path={'/login'} element={ <Login/> }/>
                <Route path={'course/:id'} element={ <Lessons/> }/>
            </Routes>
        </div>
        <Footer/>
    </div>
}