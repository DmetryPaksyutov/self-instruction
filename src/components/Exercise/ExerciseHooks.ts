import {useCallback, useState} from "react";


export const useCreateFinishFun = (indexMaterial : number,
                                   status : boolean,
                                   setStatusExercise : (statusExercise : boolean) => void,
                                   setIndexMaterial : any,
                                   updateProgress : (index: number, isError: boolean) => void,
                                   materialsLength : number,
) => {
    const [isErrorMaterials, setIsErrorMaterials] = useState(false)

    return useCallback((isError: boolean) => {
        if (!status) {
            updateProgress(indexMaterial, isError)
            if (isError) setIsErrorMaterials(isError)
            if (indexMaterial < materialsLength - 1) setIndexMaterial(indexMaterial + 1)
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
    }, [indexMaterial, status, isErrorMaterials, setStatusExercise, setIndexMaterial, updateProgress, setIsErrorMaterials, materialsLength])
}

export const useCreateSwitches = (indexMaterial : number, materialsLength : number, setIndexMaterial : any) => {
    const toNext = useCallback(() => {
        if (indexMaterial + 1 < materialsLength) setIndexMaterial(indexMaterial + 1)
        else setIndexMaterial( 0 )
    }, [indexMaterial, materialsLength, setIndexMaterial])

    const toPrev = useCallback(() => {
        if (indexMaterial - 1 > -1) setIndexMaterial(indexMaterial - 1)
        else setIndexMaterial( materialsLength - 1 )
    }, [indexMaterial, materialsLength, setIndexMaterial])

    return [toNext, toPrev]
}