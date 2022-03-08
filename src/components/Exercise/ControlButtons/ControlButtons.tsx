import React from 'react'

import st from './ControlButtons.module.scss'
import stButton from '../../common/styles/button.module.scss'
import {useAppSelector} from "../../../packets/hooks";

interface IProps {
    openDictionary : () => void,
    setTypeExercise : () => void,
    clearProgress : () => void,
    updateStatistic : (minutes : number) => void,
    isActive : boolean,
}

export const ControlButtons: React.FC<IProps>  = ({ openDictionary,
                                                      setTypeExercise,
                                                      clearProgress,
                                                      isActive,
                                                      updateStatistic
                                                  }) => {

    //const minutes = useAppSelector(state => state.userWork.minutes)
    return <div className={st.controlButtons}>
        <div className={st.controlButtons__dopButton}>
            <button onClick={openDictionary}
            >Словать</button>
        </div>

        <div className={st.controlButtons__generalButton}>
            <button className={stButton.orangeButton}
                    onClick={() => updateStatistic(0)}
            >сохранить</button>
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