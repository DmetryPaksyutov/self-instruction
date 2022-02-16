import React from 'react'
import st from './ProgressBar.module.scss'

interface IProps {
    progress : number,
}

export const ProgressBar : React.FC<IProps> = ({progress}) => {
    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#f2a54b',
        borderRadius: 'inherit',
        zIndex: 2,
    }
    return <div className={st.progressBar}>
        <div style={fillerStyles}></div>
        <label className={st.progressBar__label}>{progress}%</label>
    </div>
}