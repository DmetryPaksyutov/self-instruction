import React, {useEffect, useRef, useState} from 'react'
import st from './AudioPlayer.module.scss'

import arrowLeftImg from '../../../img/aydioPlayer/long_arrow_left.png'
import arrowRightImg from '../../../img/aydioPlayer/long_arrow_right.png'
import pauseImg from '../../../img/aydioPlayer/pause.png'
import playImg from '../../../img/aydioPlayer/play.png'

interface IProps {
    audioSrc : string,
    initialIsPlaying? : boolean
    toNextTrack : () => void,
    toPrevTrack : () => void,
    toEndTrack : () => void,
}

export const AudioPlayer : React.FC<IProps> = ({audioSrc,
                                                   toNextTrack,
                                                   toPrevTrack,
                                                   initialIsPlaying = false,
                                                   toEndTrack
                                               }) => {
    const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
    const [trackProgress, setTrackProgress] = useState(0);

    // Refs

    const audioRef = useRef(new Audio(audioSrc))
    const intervalRef = useRef<any>()
    const isReady = useRef(false)

    const { duration } = audioRef.current

   /* const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%"
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;*/

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toEndTrack()
                setIsPlaying(false)
            } else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, 1000);
    };

    const onScrub = (value : number) => {
        // Clear any timers already running
        clearInterval(intervalRef.current)
        audioRef.current.currentTime = value
        setTrackProgress(audioRef.current.currentTime)
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true)
        }
        startTimer()
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
            startTimer()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        audioRef.current.pause()

        audioRef.current = new Audio(audioSrc)
        setTrackProgress(audioRef.current.currentTime)

        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
            isReady.current = true
        }
    }, [audioSrc])

    useEffect(() => {
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        };
    }, [])

    const onSetPlayer = (isPlaying : boolean) => () => {
        setIsPlaying(isPlaying)
    }

    return <div className={st.audioPlayer}>
        <div className={st.audioPlayer__controlButton}>
            <button
                className={st.audioPlayer__buttonPassing}
                onClick={toPrevTrack}
            >
                <img src={arrowLeftImg}/>
            </button>
            {isPlaying ? (
                <button
                    className={st.audioPlayer__buttonPlay}
                    onClick={onSetPlayer(false)}
                >
                    <img src={pauseImg}/>
                </button>
            ) : (
                <button
                    className={st.audioPlayer__buttonPlay}
                    onClick={onSetPlayer(true)}
                >
                    <img src={playImg}/>
                </button>
            )}
            <button
                className={st.audioPlayer__buttonPassing}
                onClick={toNextTrack}
            >
                <img src={arrowRightImg}/>
            </button>
        </div>

    </div>
}

/*<div className={st.audioPlayer__progress}><input
    type="range"
    value={trackProgress}
    step="1"
    min="0"
    max={duration ? duration : `${duration}`}
    onChange={(e: any) => onScrub(e.target.value)}
    onMouseUp={onScrubEnd}
    onKeyUp={onScrubEnd}
    style={{ background: trackStyling }}
/></div>*/