import React, {useEffect, useReducer, useState} from 'react'

import st from './InputExercise.module.scss'
import {progressItem} from "../../../packets/api/TypeRequest";
import {initialInputExerciseState, InputExerciseActions, InputExerciseReducer} from "./InputExerciseReducer";
import {ExerciseActions} from "../../Exercise/ExerciseReducer";

interface IProps {
    proposal: string | undefined,
    finishFun : (isError : boolean) => void,
    countBalls : (balls : number) => void,
    
    status : progressItem,
}
//returnText : () => string | null,

interface IWord {
    text : string,
    status : 'default' | 'ok' | 'err'
}

export const InputExercise : React.FC<IProps> = ({ proposal, finishFun, countBalls, status}) => {

    const [state, dispatch] = useReducer(InputExerciseReducer, initialInputExerciseState)
    const {
        index,
        words,
        hint,
        isError,
        errCount,
        inputText,
    } = state

    useEffect(() => {
        dispatch(InputExerciseActions.setProposal(proposal))
        dispatch(InputExerciseActions.initialState())
    }, [proposal])

    useEffect (() => {

        if ( proposal && proposal[index] === ' ') {
            dispatch(InputExerciseActions.nextWord(words, index, inputText))
        }

        if (proposal && index == proposal.length) {
            finishFun(isError)
        }

    }, [index])

    
    if (status === 'yes') {
        finishFun(false)
    }

    const text = words.map( (word, ind) => {
        let stSpan = null
        switch (word.status) {
            case "err": stSpan = `${st.inputExercise__span_err} ${st.inputExercise__span_default}`
                break
            case "ok": stSpan = `${st.inputExercise__span_ok} ${st.inputExercise__span_default}`
                break
            case "default": stSpan = st.inputExercise__span_default
        }
        return <span className={stSpan} key={ind}>{word.text}</span>
    })

    const onChange = (event : any) => {
        const s = event.target.value[event.target.value.length-1]
        if ( proposal && s === proposal[index]) {
            dispatch(InputExerciseActions.correctWrite(s, event.target.value, words, hint, index))
            if (status != 'yes') countBalls(1)
        }
        else {
            dispatch(InputExerciseActions.errorWrite(words, hint, index, proposal as string, isError, errCount))
            if (status != 'yes') countBalls(-3)
        }
    }

    
    return <div className={st.inputExercise}>
        <input value={inputText}
               onChange={onChange}
               className={st.inputExercise__input}
               placeholder={'Введите текст'}
        />
        <div className={st.inputExercise__text}>{text}
        <span className={`${st.inputExercise__span_default} ${st.inputExercise__span_hint}`}>{hint}</span>
        </div>
    </div>
}