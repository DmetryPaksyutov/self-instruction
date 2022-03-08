import React, {useCallback, useState} from 'react'
import {IMaterial} from '../../../packets/api/TypeRequest'
import {progressItem} from '../../../packets/api/TypeRequest'
import {InputExercise} from "../../common/InputExercise/InputExercise";

import st from '../Exercise.module.scss'
import {useCreateFinishFun} from "../ExerciseHooks";

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
    //const [isErrorMaterials, setIsErrorMaterials] = useState(false)

    const finishFun = useCreateFinishFun(indexMaterial,
        status, setStatusExercise, setIndexMaterial, updateProgress, materials.length)

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