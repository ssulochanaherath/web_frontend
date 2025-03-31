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
        // Clean up the audio instance when unmounting or switching tracks
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0; // Reset the time when stopping
            }
        };
    }, [audio]);

    const playTrack = (track) => {
        // Pause any current track
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset the audio
        }

        // Create a new audio instance for the new track
        const newAudio = new Audio(track.src);
        newAudio.play().then(() => {
            setIsPlaying(true);
        }).catch(error => {
            console.error('Error playing audio:', error);
        });

        // Update state with the new track
        setAudio(newAudio);
        setCurrentTrack(track);

        // Listen for when the track is playing or paused
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
