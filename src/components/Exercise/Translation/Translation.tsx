import React, {useCallback, useState} from 'react'
import {IMaterial} from '../../../packets/api/TypeRequest'
import {progressItem} from '../../../packets/api/TypeRequest'
import {typeExercise} from '../ExerciseReducer'
import {InputExercise} from "../../common/InputExercise/InputExercise";

interface IProps {
    materials: IMaterial[],
    progress: progressItem[],
    updateProgress: (index: number, isError: boolean) => void,
    countBalls: (countBalls: number) => void,
    setTypeExercise: () => void,
}

export const Translation: React.FC<IProps> = ({
                                                  materials,
                                                  progress,
                                                  updateProgress,
                                                  countBalls,
                                                  setTypeExercise
                                              }) => {
    const [indexMaterial, setIndexMaterial] = useState(0)
    const [isErrorMaterials, setIsErrorMaterials] = useState(false)

    const finishFun = useCallback((isError: boolean) => {
        updateProgress(indexMaterial, isError)
        if (isError) setIsErrorMaterials(isError)
        if (indexMaterial < materials.length - 1) setIndexMaterial(indexMaterial + 1)
        else {
            if (!isErrorMaterials) setTypeExercise()
            else {
                setIndexMaterial(0)
                setIsErrorMaterials(false)
            }
        }
    }, [indexMaterial])

    const [writeText, setWriteText] = useState<string | null>(null)
    const returnText = useCallback(() => {
        const returnText = writeText
        setWriteText(null)
        return returnText
    }, [writeText])

    return <div>
        <div><label>{materials[indexMaterial].proposalRus}</label></div>
        <div>
            <InputExercise proposal={materials[indexMaterial].proposal}
                           finishFun={finishFun}
                           countBalls={countBalls}
                           returnText={returnText}
                           status={progress[indexMaterial]}
            />
        </div>
    </div>
}