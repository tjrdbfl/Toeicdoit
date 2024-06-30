'use client';
import { ChangeEvent, useRef, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const ToeicPlayer = ({sound}:{sound:string}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    let prevVolume: number | undefined = audioRef.current?.volume;

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    const onLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
        }
    }

    const onTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
        }
    }

    const onSeek = (event: ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Number(event.target.value);
        }
    }

    const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = Number(event.target.value);
            setVolume(Number(event.target.value));
            prevVolume = Number(event.target.value);
        }
    }

    const onMuteChange = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isMuted) {
                audio.muted = false; // Unmute
                setIsMuted(false);
                setVolume(prevVolume || 0);
            } else {
                audio.muted = true; // Mute
                setVolume(0);
                setIsMuted(true);
            }
        }
    };

    return (<>
        <div className='bg-white shadow-lg rounded-xl w-full p-2 border-slate-200 border-2 flex flex-row items-center justify-between gap-x-3'>
            <audio
                ref={audioRef}
                src={`${sound}`}
                preload='none'
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
            />
            <button
                onClick={togglePlayPause}
                className='text-black'>
                {isPlaying ?
                    <>
                        <PauseCircleOutlineIcon className='text-blue-600 text-4xl hover:text-blue-500' />
                    </> : <>
                        <PlayCircleOutlineIcon className='text-blue-600 text-4xl hover:text-blue-500' />
                    </>}
            </button>
            <div className='text-black text-xl font-medium w-[130px] text-center text-balance'>
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
            </div>
            <div className={`w-full flex items-center`}>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={onSeek}
                    className="w-full"
                />
            </div>
            <div className='flex flex-row gap-x-2'></div>

            <div className="w-[230px] p-2 flex items-center gap-x-2">
                <button
                    onClick={onMuteChange}
                >
                    {isMuted ? <>
                        <VolumeOffIcon className='text-blue-600 text-3xl hover:text-blue-500' />
                    </> : <>
                        <VolumeUpIcon className='text-blue-600 text-3xl hover:text-blue-500' />
                    </>}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01" // Allow finer volume adjustments
                    value={volume}
                    onChange={onVolumeChange}
                    className="w-full"
                />
            </div>
        </div>
    </>);
}
export default ToeicPlayer;