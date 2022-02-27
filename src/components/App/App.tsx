import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {Navbar} from '../Navbar/Navbar'
import {Footer} from '../Footer/Footer'
import {Login} from '../Login/Login'
import {Home} from '../Home/Home'
import {Lessons} from '../Lessons/Lessons'
import {Exercise} from '../Exercise/Exercise'
import {MustLogin } from '../common/MustLogin/MustLogin'

import st from './App.module.scss'
import stCenterBlock from '../common/styles/centerBlock.module.scss'



export const App : React.FC = () => {

    return <div className={st.body}>
        <Navbar/>
        <div className={`${stCenterBlock.centerBlock} ${st.content}`}>
            <Routes>
                <Route path={'/home' || ''} element={ <Home/> }/>
                <Route path={'/login'} element={ <Login/> }/>
                <Route path={'course/:id'} element={ <Lessons/> }/>
                <Route path={'exercise/:id/:number'} element={ <MustLogin><Exercise/></MustLogin>} />
            </Routes>
        </div>
        <Footer/>
    </div>
}