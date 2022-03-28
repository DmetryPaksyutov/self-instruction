import React, {useCallback, useEffect} from 'react'
import {useReducerAsync} from 'use-reducer-async'
import {ExerciseAsyncActions,
    ExerciseReducer,
    initialExerciseState,
    ExerciseActions,
    typeExercise,
} from './ExerciseReducer'
import {useAppSelector} from '../../packets/hooks'
import {useParams} from 'react-router-dom'

import {Timer} from './Timer/Timer'
import {ProgressItems} from './ProgressItems/ProgressItems'
import {Translation} from './Translation/Translation'
import { Dictionary } from './Dictionary/Dictionary'
import { Loading} from '../common/Loading/Loading'
import {ControlButtons} from './ControlButtons/ControlButtons'
import {Listening} from './Listening/Listening'
import {Dictation} from './Dictation/Dictation'
import {ResultExercise} from './ResultExercise/ResultExercise'

import st from './Exercise.module.scss'
import {Theory} from "./Theory/Theory";
import {IMaterial} from "../../packets/api/TypeRequest";
import {AdditionalNavbar} from "../common/AdditionalNavbar/AdditionalNavbar";




export const Exercise : React.FC = () => {
    const [state, dispatch] = useReducerAsync(ExerciseReducer, initialExerciseState, ExerciseAsyncActions)
    const isLogin = useAppSelector( state => state.login.isLogin)
    let {id, number} = useParams()
    let number1: number | undefined
    if (number) number1 = parseInt(number)

    const {typeExercise, 
        progress, 
        name, 
        materials, 
        balls, 
        countBall,
        words,
        isVisibleDictionary,
        isLoading,
        statusExercises,
    } = state

    useEffect(() => {
        dispatch(ExerciseActions.setExercise(id, number1))
    }, [isLogin, id, number1])

    const updateStatistic = useCallback((minutes : number) => {

        if (id && number1) dispatch(ExerciseActions.updateStatistic(id, number1, progress, balls, minutes))
    }, [id, number1, progress, balls])

    const setTypeExercise = useCallback( (typeExercise : number) => () => {
        dispatch(ExerciseActions.setTypeExercise(typeExercise as typeExercise))
    }, [])

    const clearProgress = useCallback(() => {
        dispatch(ExerciseActions.clearProgress((typeExercise - 1) as typeExercise, materials.length))
    }, [typeExercise, materials.length])

    const progressItems = progress[typeExercise-1]

    const setVisibleDictionary = (isVisibleDictionary : boolean) => () => {
        dispatch(ExerciseActions.setIsVisibleDictionary(isVisibleDictionary))
    }

    const closeDictionary = (words : IMaterial[]) => {
        dispatch(ExerciseActions.updateDictionary(words))
    }

    let exercise = useCreateExercise(state, dispatch, updateStatistic, id, number1, setTypeExercise)

    useEffect(() => {
        if (typeExercise === 1) {
            setVisibleDictionary(true)()
        }
    }, [typeExercise])

    if (isLoading) return <Loading/>

    return <div className={st.exercise}>
        <div className={st.exercise__name}><label>{name}</label></div>

        <div>
            <AdditionalNavbar activeItem={typeExercise}
                              setActiveItem={setTypeExercise}
                              listItems={['Правило', 'Словарь', 'Аудирование', 'Перевод', 'Диктант']}
            />
        </div>

        {(typeExercise > 0 && typeExercise < 5) && <div className={st.exercise__lineFunction}>
            <div className={st.exercise__lineFunction__timer}><Timer/></div>
            <div className={st.exercise__lineFunction__progress}><ProgressItems progress={progressItems}/></div>
            <div className={st.exercise__lineFunction__balls}>
                <label className={st.exercise__text}>Баллы </label>
                <label className={st.exercise__selectedText}>{balls}</label>
                { (countBall != 0) && ((countBall < 0) ?
                <div className={st.exercise__text_menuse}><label >{ countBall}</label></div> :
                <div className={st.exercise__text_pluse}><label >{`+${countBall}`}</label></div>)
                }
            </div>
        </div>}

        <div className={st.exercise__body}>
            {exercise}
        </div>

        {(isVisibleDictionary) && <div className={st.exercise__dictionary}>
            <Dictionary words={words}
                closeDictionary={closeDictionary}
            />
            </div>
        }

        {(typeExercise > 0 && typeExercise < 5) && <ControlButtons openDictionary={setVisibleDictionary(true)}
                                                                   setTypeExercise={setTypeExercise((typeExercise + 1) as typeExercise)}
                                                                   clearProgress={clearProgress}
                                                                   updateStatistic={updateStatistic}
                                                                   isActive={statusExercises[typeExercise-1]}
        />}
    </div>
}

const useCreateExercise = (state : any, dispatch : any,
                           updateStatistic : (minutes : number) => void,
                           idLesson : string | undefined,
                           numberExercise : number | undefined,
                           setTypeExercise : (typeExercise : typeExercise) => () => void
                           ) => {
    const {typeExercise,
        progress,
        materials,
        balls,
        words,
        statusExercises,
        maxBalls,
        countBall,
        theory,
    } = state
    const progressItems = progress[typeExercise-1]

    const updateProgress = useCallback(( index : number, isError : boolean) => {
        let newProgress = [...progress]
        if (isError) newProgress[typeExercise - 1][ index] = 'err'
        else newProgress[typeExercise - 1][ index] = 'yes'
        dispatch(ExerciseActions.setProgress(newProgress))
    }, [typeExercise, progress] )

    const countBalls = useCallback( (newCountBalls : number) => {
        dispatch(ExerciseActions.countBalls(newCountBalls, countBall, balls))
    }, [balls, countBall])

    const setStatusExercise = useCallback((status : boolean) => {
        dispatch(ExerciseActions.setStatusExercise((typeExercise - 1) as typeExercise, status))
    }, [typeExercise])

    let exercise
    switch (typeExercise) {
        case 0 : exercise = <Theory theory={theory}/>
            break
        case 1 :
            exercise = <Translation materials={words}
                                    progress={progressItems}
                                    updateProgress={updateProgress}
                                    countBalls={countBalls}
                                    setStatusExercise={setStatusExercise}
                                    status={statusExercises[typeExercise-1]}
            />
            break
        case 2 : exercise = <Listening materials={materials}
                                       progress={progressItems}
                                       updateProgress={updateProgress}
                                       countBalls={countBalls}
                                       setStatusExercise={setStatusExercise}
                                       status={statusExercises[typeExercise-1]}
        />
            break
        case 3 : exercise = <Translation materials={materials}
                                         progress={progressItems}
                                         updateProgress={updateProgress}
                                         countBalls={countBalls}
                                         setStatusExercise={setStatusExercise}
                                         status={statusExercises[typeExercise-1]}
        />
            break
        case 4 : exercise = <Dictation materials={materials}
                                       progress={progressItems}
                                       updateProgress={updateProgress}
                                       countBalls={countBalls}
                                       setStatusExercise={setStatusExercise}
                                       status={statusExercises[typeExercise-1]}
        />
            break
        case 5 : exercise = <ResultExercise statusExercises={statusExercises}
                                            balls={balls}
                                            maxBalls={maxBalls}
                                            updateStatistic={updateStatistic}
                                            setTypeExercise={setTypeExercise}
                                            idLesson={idLesson}
                                            numberExercise={numberExercise}
        />
            break
    }

    return exercise
}
