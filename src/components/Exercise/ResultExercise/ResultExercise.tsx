import React, {useEffect} from 'react'

import st from './ResultExercise.module.scss'
import stButton from '../../common/styles/button.module.scss'

import starImg from '../../../img/star.png'
import arrowImg from '../../../img/small_arrow.png'
import {DailyPlan} from "../../common/DailyPlan/DailyPlan";
import {useAppSelector} from "../../../packets/hooks";
import {useDispatch} from "react-redux";
import {updateTimeThunk} from "../../../redux/reducers/UserWork/UserWorkActions";
import {Link} from "react-router-dom";
import {typeExercise} from "../ExerciseReducer";

interface IProps {
    statusExercises : boolean[],
    balls : number,
    maxBalls : number,
    updateStatistic : (minutes : number) => void,
    idLesson : string | undefined,
    numberExercise : number | undefined,
    setTypeExercise : (typeExercise : typeExercise) => () => void
}

export const ResultExercise : React.FC<IProps> = ({ statusExercises,
                                                      balls,
                                                      maxBalls,
                                                      updateStatistic,
                                                      idLesson,
                                                      numberExercise,
                                                      setTypeExercise
                                                  }) => {
    const isFinished = statusExercises[0] && statusExercises[1] && statusExercises[2] && statusExercises[3]
    const stars = createStars(balls, maxBalls)

    const dispatch = useDispatch()
    const minutes = useAppSelector(state => state.userWork.minutes)
    useEffect(() => {
        if (isFinished) {
            //eventBus.saveTime.broadcast()
            dispatch(updateTimeThunk(minutes))
            updateStatistic(minutes)
        }
    }, [isFinished])

    let path = useCreateNextPath(idLesson, numberExercise)

    return <div className={st.resultExercise}>
        <div className={st.resultExercise__header}> { (isFinished) ?
            <label className={st.resultExercise__header_green}>Урок закончен</label> :
            <label className={st.resultExercise__header_red}>Не все упражнения выполнены</label>
        }
        </div>

        <div className={st.resultExercise__listStars}>
            {(isFinished) && stars}
        </div>
        <div className={st.resultExercise__balls}><label>{balls} / {maxBalls}</label></div>

        <div><DailyPlan/></div>

        <div className={st.resultExercise__button}>
            <Link to={path}><button className={stButton.orangeButton} onClick={setTypeExercise(0)}>
                <div>Следующий урок<img src={arrowImg}/></div>
            </button></Link>
        </div>
    </div>
}

const createStars = (balls : number, maxBalls : number) => {
    const percent = balls * 100 / maxBalls
    let countStars
    if (percent <= 50 ) countStars = 1
    else if (percent < 100) countStars = 2
    else countStars = 3
    let stars = []
    for (let i = 0; i < countStars; i++) stars.push( <div className={st.resultExercise__star}><img src={starImg}/></div> )
    return stars
}

const useCreateNextPath = (idLesson : string | undefined,
                           numberExercise : number | undefined) => {
    let path = '/home'
    const  extremeExercises = useAppSelector(state => state.userWork.extremeExercises)

    debugger
    if (idLesson && numberExercise && extremeExercises) {
        const nextNumberExercise = numberExercise + 1
        let nextIdLesson = idLesson
        const indexIdLesson = extremeExercises.findIndex((extremeExercise) => extremeExercise.id === idLesson)
        if (nextNumberExercise > extremeExercises[indexIdLesson].numberExercise) {
            if (extremeExercises[indexIdLesson + 1]){
                nextIdLesson = extremeExercises[indexIdLesson].id
            }
        }
    path = `/exercise/${nextIdLesson}/${nextNumberExercise}`
    }

    return path
}