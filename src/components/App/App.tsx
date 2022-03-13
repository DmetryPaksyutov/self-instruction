import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'

import {Navbar} from '../Navbar/Navbar'
import {Footer} from '../Footer/Footer'
import {Login} from '../Login/Login'
import {Home} from '../Home/Home'
import {Lessons} from '../Lessons/Lessons'
import {Exercise} from '../Exercise/Exercise'
import {MustLogin } from '../common/MustLogin/MustLogin'
import {Statistics} from '../Statistics/Statistics'
import {Dictionary} from '../Dictionary/Dictionary'
import {Profile} from '../Profile/Profile'

import st from './App.module.scss'
import stCenterBlock from '../common/styles/centerBlock.module.scss'
import {NotPage} from "../NotPage/NotPage";





export const App : React.FC = () => {


    return <div className={st.body}>
        <Navbar/>
        <div className={`${stCenterBlock.centerBlock} ${st.content}`}>
            <Routes>
                <Route path={'/'} element={ <Home/> }/>
                <Route path={'/login'} element={ <Login/> }/>
                <Route path={'/course/:id'} element={ <Lessons/> }/>
                <Route path={'/exercise/:id/:number'} element={ <MustLogin><Exercise/></MustLogin>} />
                <Route path={'/dictionary/:page'} element={<MustLogin><Dictionary/></MustLogin>} />
                <Route path={'/statistics'} element={ <MustLogin><Statistics/></MustLogin>}/>
                <Route path={'/profile'} element={ <MustLogin><Profile/></MustLogin> } />
                <Route path={'*'} element={<NotPage/>} />
            </Routes>
        </div>
        <Footer/>
    </div>
}