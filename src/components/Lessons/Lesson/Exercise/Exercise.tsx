import React from 'react'
import {IExerciseInfo} from '../../../../packets/api/TypeRequest'

import {ProgressBar} from '../../../common/ProgressBar/ProgressBar'
import {Link} from 'react-router-dom'

import st from './Exercise.module.scss'
import stButton from '../../../common/styles/button.module.scss'

interface IProps extends IExerciseInfo{
    id : string | undefined,
}

export const Exercise : React.FC<IProps> = ( {name,
                                                 number,
                                                 progress,
                                                 balls,
                                                 id} ) => {
    const textButton = (progress == 0 && 'Начать') || (progress == 100 && 'Повторить') || 'Продолжить'
    const patch = (id) ? `/exercise/${id}/${number}` : '/home'

    return <div className={st.exercise}>
        <Link to={patch}>
            <div className={st.exercise__content}>
                {(progress > 0) && <div><ProgressBar progress={progress}/></div>}

                {(balls > 0) && <div className={st.exercise__balls}>
                    <label>{balls} балов</label>
                </div>}

                <div className={st.exercise__details}>
                    <div className={st.exercise__label}><label>урок</label></div>
                    <div className={st.exercise__name}><label>{`${number} ${name}`}</label></div>
                    <div className={st.exercise__button}>
                        <button className={stButton.orangeButton}>{textButton}</button>
                    </div>
                </div>
            </div>
        </Link>
    </div>
}