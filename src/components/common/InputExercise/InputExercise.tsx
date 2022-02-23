import React, {useState} from 'react'

import st from './InputExercise.module.scss'
import {progressItem} from "../../../packets/api/TypeRequest";

interface IProps {
    proposal: string | undefined,
    finishFun : (isError : boolean) => void,
    countBalls : (balls : number) => void,
    returnText : () => string | null,
    status : progressItem,
}

interface IWord {
    text : string,
    status : 'default' | 'ok' | 'err'
}

export const InputExercise : React.FC<IProps> = ({ proposal, finishFun, countBalls, returnText, status}) => {
    const [index, setIndex] = useState(0)
    let [words, setWords] = useState<IWord[]>([{text: '', status: 'default'}])
    const [wordsText, setWordsText] = useState('')
    let [hint, setHint] = useState('')
    const [errCount, setErrCount] = useState(0)
    const [isError, setIsError] = useState(false)

    if ( proposal && proposal[index] === ' ') {
        if (words[words.length-1].status != 'err' ) words[words.length-1].status = 'ok'
        words[words.length-1].text += ' '
        words.push({text: '', status: 'default'})
        setIndex(index + 1 )
        setWords(words)
        setWordsText(wordsText + ' ' )
        setErrCount(0)
        setHint('')
    }

    if (status === 'yes') finishFun(false)

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

    if (proposal && index == proposal.length) {
        finishFun(isError)
        setIndex(0)
        setWords([{text: '', status: 'default'}])
        setWordsText('')
        setHint('')
        setErrCount(0)
        setIsError(false)

    }

    const writeText = returnText()
    if (writeText) {

    }

    const onChange = (event : any) => {
        const s = event.target.value[event.target.value.length-1]
        if ( proposal && s === proposal[index]) {
            words[words.length-1].text += s
            if (hint) setHint(hint.slice(1))
            setIndex(index + 1 )
            setWords(words)
            setWordsText(event.target.value)
            countBalls(1)
        }
        else {
            setErrCount(errCount + 1)
            if (!isError) setIsError(true)
            words[words.length-1].status = 'err'
            setWords(words)
            if (errCount > 1) findHint()
            countBalls(-3)
        }
    }

    const findHint = () => {
        hint = ''
        let i = index
        while (proposal && (proposal[i] !== ' ' && i < proposal.length )) {
            hint += proposal[i]
            i++
        }
        setHint(hint)
    }

    return <div className={st.inputExercise}>
        <input value={wordsText}
               onChange={onChange}
               className={st.inputExercise__input}
               placeholder={'Введите текст'}
        />
        <div className={st.inputExercise__text}>{text}
        <span className={`${st.inputExercise__span_default} ${st.inputExercise__span_hint}`}>{hint}</span>
        </div>
    </div>
}