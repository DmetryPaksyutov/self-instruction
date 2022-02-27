import React from 'react'
import loadingGif from '../../../img/loading.gif'
import st from './Loading.module.scss'

export const Loading : React.FC = ( ) => {
    return <div className={st.loading}>
        <img src={loadingGif} />
    </div>
}