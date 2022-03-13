import React, {useRef} from 'react'
import st from './RowDictionary.module.scss'
import soundImg from '../../../img/sound.png'

interface IProps {
    proposal : string,
    proposalRus : string,
    audio : string,
    isAdd : boolean,
    setIsAdd : () => void,
}

export const RowDictionary : React.FC<IProps> = ({proposal,
                                                     proposalRus,
                                                     audio,
                                                     isAdd,
                                                     setIsAdd}) => {
    const audioRef = useRef(new Audio(audio))
    const onPlay = () => {
        audioRef.current.play()
    }

    return <tr>
        <td><button onClick={onPlay} className={st.buttonSound}><img src={soundImg}/></button></td>
        <td>{proposal}</td>
        <td>{proposalRus}</td>
        <td><input type={'checkbox'}
                   checked={isAdd}
                   onChange={setIsAdd}
        />
        </td>
    </tr>
}