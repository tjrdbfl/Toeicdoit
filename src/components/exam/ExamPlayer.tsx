'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const  ExamPlayer = ({ sound }: { sound: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    let prevVolume: number | undefined = audioRef.current?.volume;

    const [showVolumeControl, setShowVolumeControl] = useState(false);
    let timeoutId: NodeJS.Timeout | null = null; // Store the timeout ID

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
      onVolumeChange(event);
      setShowVolumeControl(true); // Show the control when it's being used
  
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear existing timeout
      }
      
      timeoutId = setTimeout(() => {
        setShowVolumeControl(false); // Hide after 10 seconds of inactivity
      }, 1000*2);
    };
  

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
        setShowVolumeControl(true);
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

    useEffect(() => {
        if (audioRef.current?.volume !== 0) {
            setIsMuted(false);
        }
    }, [audioRef.current?.volume]);

    return (<>
        <div className='w-[290px] p-2 flex flex-row items-center justify-between'>
            <audio
                ref={audioRef}
                src={sound}
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
            <div className='text-black text-md font-medium w-[200px] text-center text-balance'>
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
            <div className='flex flex-row'></div>

            <div className="w-[12px] flex items-center ml-2">
                <button
                    className='order-2'
                    onClick={onMuteChange}
                >
                    {isMuted ? <>
                        <VolumeOffIcon className='text-blue-600 text-3xl hover:text-blue-500' />
                    </> : <>
                        <VolumeUpIcon className='text-blue-600 text-3xl hover:text-blue-500' />
                    </>}
                </button>

                {showVolumeControl && ( // Conditionally render the volume slider
                    <div className="w-1 order-1">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange} // Call the modified handler
                            className="w-16 ml-3 origin-top-left"
                            style={{ transform: 'rotate(-90deg)' }}
                        />
                    </div>
                )}
            </div>
        </div>
    </>);
}
export default ExamPlayer;