import React from 'react'

import st from './Logo.module.scss'
import logoImg from '../../../img/book-stack.png'
import {Link} from "react-router-dom";

export const Logo : React.FC = () => {
    return <div className={st.logo}>
        <Link to={'/'}>
            <img src={logoImg}/>
        </Link>

    </div>
}