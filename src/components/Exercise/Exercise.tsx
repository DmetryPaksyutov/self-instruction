import React, {useEffect} from 'react'
import {useReducerAsync} from 'use-reducer-async'
import {ExerciseAsyncActions, ExerciseReducer, initialExerciseState, ExerciseActions} from './ExerciseReducer'
import {useAppSelector} from "../../packets/hooks";
import {useParams} from "react-router-dom";
import {NavbarExercise} from "./NavbarExercise/NavbarExercise";
import {Timer} from "./Timer/Timer";
import {ProgressItems} from "./ProgressItems/ProgressItems";
import {BallsCounter} from "./BallsCounter/BallsCounter";


export const Exercise : React.FC = () => {
    const [state, dispatch] = useReducerAsync(ExerciseReducer, initialExerciseState, ExerciseAsyncActions)
    const isLogin = useAppSelector( state => state.login.isLogin)
    let {id, number} = useParams()
    let number1: number | undefined
    if (number) number1 = parseInt(number)

    useEffect(() => {
        dispatch(ExerciseActions.setExercise(isLogin, id, number1))
    }, [isLogin])

    if (!isLogin)  return <div>войдите в акаунт</div>

    return <div>
        <div><NavbarExercise/></div>
        <div>
            <Timer/>
            <ProgressItems/>
            <BallsCounter/>
        </div>
        <div>

        </div>
    </div>
}