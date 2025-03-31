// context/AudioContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => {
    return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        // Clean up the audio instance when unmounting
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    const playTrack = (track) => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        const newAudio = new Audio(track.src);
        newAudio.play().then(() => {
            setIsPlaying(true);
        }).catch(error => {
            console.error('Error playing audio:', error);
        });

        setAudio(newAudio);
        setCurrentTrack(track);

        newAudio.ontimeupdate = () => {
            setIsPlaying(!newAudio.paused);
        };
    };

    const togglePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <AudioContext.Provider value={{ audio, isPlaying, currentTrack, playTrack, togglePlayPause }}>
            {children}
        </AudioContext.Provider>
    );
};
