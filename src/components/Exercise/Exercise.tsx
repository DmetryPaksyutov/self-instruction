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

import st from './Exercise.module.scss'
import {progressItem} from "../../packets/api/TypeRequest";



export const Exercise : React.FC = () => {
    const [state, dispatch] = useReducerAsync(ExerciseReducer, initialExerciseState, ExerciseAsyncActions)
    const isLogin = useAppSelector( state => state.login.isLogin)
    let {id, number} = useParams()
    let number1: number | undefined
    if (number) number1 = parseInt(number)

    const {typeExercise, progress, name, materials, balls, countBall} = state

    useEffect(() => {
        dispatch(ExerciseActions.setExercise(isLogin, id, number1))
    }, [isLogin])

    const setTypeExercise = useCallback( (typeExercise : typeExercise) => () => {
        dispatch(ExerciseActions.setTypeExercise(typeExercise))
    }, [])

    const progressItems = progress[typeExercise-1]

    const updateProgress = useCallback(( index : number, isError : boolean) => {
        let newProgress = [...progress]
        if (isError) newProgress[typeExercise - 1][ index] = 'err'
        else newProgress[typeExercise - 1][ index] = 'yes'
        dispatch(ExerciseActions.setProgress(newProgress))
    }, [typeExercise] )

    const countBalls = useCallback( (newCountBalls : number) => {
        dispatch(ExerciseActions.countBalls(newCountBalls, countBall, balls))
    }, [balls])

    if (!isLogin)  return <div>войдите в акаунт</div>

    let exercise
    switch (typeExercise) {
        case 0 : exercise = <div>правило</div>
            break
        case 1 : exercise = <div>словарь</div>
            break
        case 2 : exercise = <div>аудирование</div>
            break
        case 3 : exercise = <Translation materials={materials}
                                         progress={progressItems}
                                         updateProgress={updateProgress}
                                         countBalls={countBalls}
                                         setTypeExercise={setTypeExercise(4)}
        />
            break
        case 4 : exercise = <div>диктант</div>
            break
    }



    return <div className={st.exercise}>
        <div className={st.exercise__name}><label>{name}</label></div>

        <div><NavbarExercise typeExercise={typeExercise} setTypeExercise={setTypeExercise}/></div>

        {(state.typeExercise > 0) && <div className={st.exercise__lineFunction}>
            <Timer/>
            <ProgressItems progress={progressItems}/>
            <div>
                <label className={st.exercise__text}>Баллы </label>
                <label className={st.exercise__selectedText}>{balls}</label>
                { (countBall != 0) && <label>{(countBall < 0) ? `${countBall}` : `+${countBall}`}</label>}
            </div>
        </div>}

        <div>
            {exercise}
        </div>
    </div>
}