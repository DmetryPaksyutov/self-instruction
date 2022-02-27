import {InferValueTypes} from "../../../redux/store";
import {useState} from "react";

interface IInputExerciseState {
    proposal : string | undefined,
    index: number,
    words: IWord[],
    inputText: string,
    hint: string,
    errCount: number,
    isError: boolean,
}

export const initialInputExerciseState : IInputExerciseState = {
    proposal : undefined,
    index: 0,
    words: [{text: '', status: 'default'}],
    inputText: '',
    hint: '',
    errCount: 0,
    isError: false,
}

export const InputExerciseReducer = (state : IInputExerciseState, action : InputExerciseActionsType) => {
    switch (action.type) {
        case 'INPUT__SET_PROPOSAL' : return {...state, proposal : action.proposal}

        case 'INPUT__NEXT_WORD' : {
            const {words, index, inputText} = action
            return {
                ...state,
                words,
                index,
                inputText,
                errCount: 0,
                hint: ''
            }
        }

        case 'INPUT__CORRECT_WRITE' : {
            let {words, hint, index, inputText} = action

            return {
                ...state,
                words, hint, index, inputText
            }
        }

        case 'INPUT__ERROR_WRITE' : {
            let {words, hint, index, proposal, errCount, isError} = state
            errCount ++
            if (!isError) isError = true
            words[words.length-1].status = 'err'
            if (errCount > 1) hint = findHint(index, proposal as string)
            return {...state, words, hint, index, proposal, errCount, isError}
        }

        case 'INPUT__UPDATE_STATE' : {
            const newState : IInputExerciseState =  {
                proposal : undefined,
                index: 0,
                words: [{text: '', status: 'default'}],
                inputText: '',
                hint: '',
                errCount: 0,
                isError: false,
            }
            
            return newState
        }

        case 'INPUT__SET_INDEX' : return {...state, index : action.index}

        default : return state
    }
}

export const InputExerciseActions = {
    setProposal (proposal : string | undefined) {
        return {
            type : 'INPUT__SET_PROPOSAL' as const,
            proposal
        }
    },

    nextWord (words : IWord[],
              index : number,
              inputText : string) {
        debugger
        if (words[words.length - 1].status != 'err') words[words.length - 1].status = 'ok'
        words[words.length - 1].text += ' '
        words.push({text: '', status: 'default'})
        index++
        inputText += ' '

        return {
            type : 'INPUT__NEXT_WORD' as const,
            words,
            index,
            inputText,
        }
    },

    initialState () {
        return {
            type : 'INPUT__UPDATE_STATE' as const,
        }
    },

    correctWrite (s : string,
                  inputText : string,
                  words : IWord[], 
                  hint : string, 
                  index : number) {
        debugger
        words[words.length - 1].text += s
        if (hint) hint = hint.slice(1)
        index++
        
        return {
            type : 'INPUT__CORRECT_WRITE' as const,
            s, inputText, words, hint, index
        }
    },

    errorWrite () {
        return {
            type : 'INPUT__ERROR_WRITE' as const
        }
    },

    setIndex (index : number) {
        return {
            type : 'INPUT__SET_INDEX' as const,
            index
        }
    }
}

type InputExerciseActionsType = ReturnType<InferValueTypes<typeof InputExerciseActions>>

interface IWord {
    text : string,
    status : 'default' | 'ok' | 'err'
}

const findHint = (index : number, proposal : string) => {
    let hint = ''
    let i = index
    while (proposal && (proposal[i] !== ' ' && i < proposal.length )) {
        hint += proposal[i]
        i++
    }
    return hint
}