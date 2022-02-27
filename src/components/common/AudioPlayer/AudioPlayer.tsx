import React, {useEffect, useRef, useState} from 'react'

interface IProps {
    audioSrc : string,
    toNextTrack : () => void,
    toPrevTrack : () => void,
}

export const AudioPlayer : React.FC<IProps> = ({audioSrc, toNextTrack, toPrevTrack}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef<any>();
    const isReady = useRef(false);

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    const onScrub = (value : number) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

   /* const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    };

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };*/

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [audioSrc]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    const onSetPlayer = (isPlaying : boolean) => () => {
        setIsPlaying(isPlaying)
    }

    return <div>
        <div>
            <button
                type="button"
                className="prev"
                aria-label="Previous"
                onClick={toPrevTrack}
            >
                <img />
            </button>
            {isPlaying ? (
                <button
                    type="button"
                    className="pause"
                    onClick={onSetPlayer(false)}
                    aria-label="Pause"
                >
                    <img />
                </button>
            ) : (
                <button
                    type="button"
                    className="play"
                    onClick={onSetPlayer(true)}
                    aria-label="Play"
                >
                    <img/>
                </button>
            )}
            <button
                type="button"
                className="next"
                aria-label="Next"
                onClick={toNextTrack}
            >
                <img/>
            </button>
        </div>
        <div><input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e: any) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
        /></div>
    </div>
}