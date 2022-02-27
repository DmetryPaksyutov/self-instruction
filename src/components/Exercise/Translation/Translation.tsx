import React, {useCallback, useState} from 'react'
import {IMaterial} from '../../../packets/api/TypeRequest'
import {progressItem} from '../../../packets/api/TypeRequest'
import {InputExercise} from "../../common/InputExercise/InputExercise";

import st from '../Exercise.module.scss'

interface IProps {
    materials : IMaterial[],
    progress : progressItem[],
    updateProgress : (index: number, isError: boolean) => void,
    countBalls : (countBalls: number) => void,
    setStatusExercise : (statusExercise : boolean) => void,
    status : boolean
}

export const Translation: React.FC<IProps> = ({
                                                  materials,
                                                  progress,
                                                  updateProgress,
                                                  countBalls,
                                                  setStatusExercise,
                                                  status,
                                              }) => {
    const [indexMaterial, setIndexMaterial] = useState(0)
    const [isErrorMaterials, setIsErrorMaterials] = useState(false)

    const finishFun = useCallback((isError: boolean) => {

        if (!status) {
        updateProgress(indexMaterial, isError)
        if (isError) setIsErrorMaterials(isError)
        if (indexMaterial < materials.length - 1) setIndexMaterial(indexMaterial + 1)
        else {
            if (!isErrorMaterials) {
                setStatusExercise(true)
                setIndexMaterial(0)
            }
            else {
                setIndexMaterial(0)
                setIsErrorMaterials(false)
            }
        }
        }
    }, [indexMaterial, status, isErrorMaterials, setStatusExercise, setIndexMaterial, updateProgress, setIsErrorMaterials])

    return <div>
        <div className={st.exercise__header}><label>{materials[indexMaterial].proposalRus}</label></div>
        <div>
            <InputExercise proposal={materials[indexMaterial].proposal}
                           finishFun={finishFun}
                           countBalls={countBalls}
                           status={progress[indexMaterial]}
            />
        </div>
    </div>
}