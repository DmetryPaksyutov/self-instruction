import React, {useCallback, useState} from 'react'
import {AudioPlayer} from "../../common/AudioPlayer/AudioPlayer";
import {InputExercise} from "../../common/InputExercise/InputExercise";
import {IMaterial, progressItem} from "../../../packets/api/TypeRequest";
import {useCreateFinishFun, useCreateSwitches} from "../ExerciseHooks";

interface IProps {
    materials : IMaterial[],
    progress : progressItem[],
    updateProgress : (index: number, isError: boolean) => void,
    countBalls : (countBalls: number) => void,
    setStatusExercise : (statusExercise : boolean) => void,
    status : boolean
}

export const Dictation : React.FC<IProps> = ({materials,
                                                 progress,
                                                 updateProgress,
                                                 countBalls,
                                                 setStatusExercise,
                                                 status
}) => {
    const [indexMaterial, setIndexMaterial] = useState(0)
   // const [isErrorMaterials, setIsErrorMaterials] = useState(false)
    const material = materials[indexMaterial]

    const finishFun = useCreateFinishFun(indexMaterial,
        status, setStatusExercise, setIndexMaterial, updateProgress,  materials.length)

    const [toNext, toPrev] = useCreateSwitches(indexMaterial, materials.length, setIndexMaterial)

    return <div>
        <AudioPlayer audioSrc={material.audio} toNextTrack={toNext} toPrevTrack={toPrev} toEndTrack={ ()=>{} }/>
        <InputExercise proposal={material.proposal}
                       finishFun={finishFun}
                       countBalls={countBalls}
                       status={progress[indexMaterial]}
        />
    </div>
}