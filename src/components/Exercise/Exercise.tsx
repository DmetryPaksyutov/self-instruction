import React, {useCallback, useEffect, useState} from 'react'
import {useReducerAsync} from 'use-reducer-async'
import {ExerciseAsyncActions,
    ExerciseReducer,
    initialExerciseState,
    ExerciseActions,
    typeExercise,
} from './ExerciseReducer'
import {useAppSelector} from "../../packets/hooks";
import {useParams} from "react-router-dom";
import {NavbarExercise} from "./NavbarExercise/NavbarExercise";

import {Timer} from "./Timer/Timer";
import {ProgressItems} from "./ProgressItems/ProgressItems";
import {Translation} from "./Translation/Translation";
import { Dictionsry } from './Dictionary/Dictionary'
import { Loading} from '../common/Loading/Loading'
import {ControlButtons} from "./ControlButtons/ControlButtons";

import st from './Exercise.module.scss'



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
    }, [isLogin])

    const setTypeExercise = useCallback( (typeExercise : typeExercise) => () => {
        dispatch(ExerciseActions.setTypeExercise(typeExercise))
    }, [])

    const setStatusExercise = useCallback((status : boolean) => {
        dispatch(ExerciseActions.setStatusExercise((typeExercise - 1) as typeExercise, status))
    }, [typeExercise])

    const clearProgress = useCallback(() => {
        dispatch(ExerciseActions.clearProgress((typeExercise - 1) as typeExercise, materials.length))
    }, [typeExercise, materials.length])

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

    const setVisibleDictionary = (isVisibleDictionary : boolean) => () => {
        dispatch(ExerciseActions.setIsVisisbleDictionary(isVisibleDictionary))
    }

    let exercise
    switch (typeExercise) {
        case 0 : exercise = <div>правило</div>
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
        case 2 : exercise = <div>аудирование</div>
            break
        case 3 : exercise = <Translation materials={materials}
                                         progress={progressItems}
                                         updateProgress={updateProgress}
                                         countBalls={countBalls}
                                         setStatusExercise={setStatusExercise}
                                         status={statusExercises[typeExercise-1]}
        />
            break
        case 4 : exercise = <div>диктант</div>
            break
        case 5 : exercise = <div>конец</div>
            break
    }

    if (isLoading) return <Loading/>

    return <div className={st.exercise}>
        <div className={st.exercise__name}><label>{name}</label></div>

        <div>
            <NavbarExercise typeExercise={typeExercise}
                            setTypeExercise={setTypeExercise}
                            openDictionary={setVisibleDictionary(true)}
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
            <Dictionsry words={words} 
                setVisibleDictionary={setVisibleDictionary(false)}
            />
            </div>
        }

        {(typeExercise > 0 && typeExercise < 5) && <ControlButtons openDictionary={setVisibleDictionary(true)}
                                                                   setTypeExercise={setTypeExercise((typeExercise + 1) as typeExercise)}
                                                                   clearProgress={clearProgress}
                                                                   isActive={statusExercises[typeExercise-1]}
        />}
    </div>
}