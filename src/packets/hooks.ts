import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, stateType} from "../redux/store";
import {Dispatch, SetStateAction, useEffect, useRef} from "react";


export const useAppSelector: TypedUseSelectorHook<stateType> = useSelector

export const useMenu = (setIsVisible : Dispatch<SetStateAction<boolean>>) => {
    const wrapperRef = useRef<any>(null)
    function handleClickOutside(event : any) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {  document.removeEventListener("mousedown", handleClickOutside)   }
    }, [wrapperRef])

    return wrapperRef
}
