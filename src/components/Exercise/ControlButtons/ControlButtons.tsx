import React from 'react'

import st from './ControlButtons.module.scss'
import stButton from '../../common/styles/button.module.scss'

interface IProps {
    openDictionary : () => void,
    setTypeExercise : () => void,
    clearProgress : () => void,
    isActive : boolean,
}

export const ControlButtons: React.FC<IProps>  = ({ openDictionary, setTypeExercise, clearProgress, isActive}) => {

    return <div className={st.controlButtons}>
        <div className={st.controlButtons__dopButton}>
            <button onClick={openDictionary}
            >Словать</button>
        </div>

        <div className={st.controlButtons__generalButton}>
            <button className={stButton.orangeButton}
                     onClick={clearProgress}
                     disabled={!isActive}
            >начать с начала</button>
        </div>

        <div className={st.controlButtons__generalButton}>
            <button className={stButton.orangeButton}
                     disabled={!isActive}
                     onClick={setTypeExercise}
            >продолжить</button>
        </div>
    </div>
}