import React, {useCallback, useState} from 'react'
import {IMaterial, progressItem} from '../../../packets/api/TypeRequest'

import {AudioPlayer} from '../../common/AudioPlayer/AudioPlayer'

import {HiddenText} from "./HiddenText/HiddenText";
import {useCreateSwitches} from "../ExerciseHooks";

interface IProps {
    materials : IMaterial[]
    progress : progressItem[],
    updateProgress : (index: number, isError: boolean) => void,
    countBalls : (countBalls: number) => void,
    setStatusExercise : (statusExercise : boolean) => void,
    status : boolean,
}

export const Listening : React.FC<IProps> = ({materials,
                                                 progress,
                                                 updateProgress,
                                                 countBalls,
                                                 setStatusExercise,
                                                 status
                                             }) => {
    const [indexMaterial, setIndexMaterial] = useState(0)

    const material = materials[indexMaterial]

    const [toNext, toPrev] = useCreateSwitches(indexMaterial, materials.length, setIndexMaterial)

    const toEndTrack = useCallback(() => {

        if (progress[indexMaterial] !== 'yes') {
            if (indexMaterial === materials.length - 1 && !status) {
                setStatusExercise(true)
            }
            updateProgress(indexMaterial, false)
            countBalls(1)
            toNext()
        }


    }, [indexMaterial, progress, updateProgress, toNext, materials.length])

    return <div>
        <div><AudioPlayer audioSrc={material.audio}
                     toNextTrack={toNext}
                     toPrevTrack={toPrev}
                     toEndTrack={toEndTrack}
        /></div>
        <HiddenText text={material.proposal}/>
        <HiddenText text={material.proposalRus}/>
    </div>
}