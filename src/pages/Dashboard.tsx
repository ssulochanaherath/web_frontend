import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Dashboard() {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const playlist = [
        { title: 'Blinding Lights', artist: 'The Weekend', src: '/music/blinding-lights.mp3' },
        { title: 'Levitating', artist: 'Dua Lipa', src: '/music/levitating.mp3' },
        { title: 'Starboy', artist: 'The Weekend', src: '/music/starboy.mp3' },
        { title: 'Hold My Hand', artist: 'Michael Jackson', src: '/music/hold-my-hand.mp3' },
        { title: 'Angel', artist: 'Shaggy', src: '/music/angel.mp3' },
    ];

    const currentTrack = playlist[currentTrackIndex];
    const { theme } = useTheme();

    const togglePlay = () => {
        if (playing) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setPlaying(!playing);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const handleTrackClick = (index: number) => {
        setCurrentTrackIndex(index);
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const handlePrevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = playlist[currentTrackIndex].src;
            audio.load();
        }
    }, [currentTrackIndex]);


    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const getThemeClass = () => {
        switch (theme) {
            case 'light':
                return 'bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 text-black';
            case 'neutral':
                return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white';
            case 'dark':
            default:
                return 'bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white';
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('ended', handleNextTrack);
        }
        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleNextTrack);
            }
        };
    }, []);

    return (
        <div className={`min-h-screen flex font-sans transition-all duration-500 ${getThemeClass()}`}>
            <Sidebar />

            <main className="flex-1 p-8 md:p-12">
                <h2 className="text-4xl font-bold mb-8 tracking-tight">🎧 Now Playing</h2>

                <div className="bg-gradient-to-r from-teal-500 to-cyan-400 backdrop-blur-lg p-8 rounded-3xl shadow-2xl transition duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-44 h-44 bg-gradient-to-br from-teal-600 to-cyan-400 rounded-2xl flex justify-center items-center text-xl font-bold shadow-inner text-center">
                            🎵 {currentTrack.title}
                        </div>

                        <div className="flex-1 w-full">
                            <h3 className="text-3xl font-bold mb-1">{currentTrack.title}</h3>
                            <p className="text-white/60 mb-6">{currentTrack.artist}</p>

                            <div className="flex items-center gap-5 mb-4">
                                <button
                                    onClick={handlePrevTrack}
                                    className="bg-teal-600 p-3 rounded-full hover:bg-teal-500 hover:scale-110 transition-all duration-200"
                                >
                                    <SkipBack />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="bg-teal-700 p-5 rounded-full hover:bg-teal-600 hover:scale-110 transition-all duration-200"
                                >
                                    {playing ? <Pause size={28} /> : <Play size={28} />}
                                </button>
                                <button
                                    onClick={handleNextTrack}
                                    className="bg-teal-600 p-3 rounded-full hover:bg-teal-500 hover:scale-110 transition-all duration-200"
                                >
                                    <SkipForward />
                                </button>
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-4 mt-4 justify-end">
                                <Volume2 />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-24 accent-teal-600 cursor-pointer"
                                    style={{ transform: 'scale(0.8)' }}
                                />
                                <span className="text-sm text-white/70">{volume}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-sm text-white/70">{formatTime(currentTime)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full accent-teal-600 cursor-pointer"
                                />
                                <span className="text-sm text-white/70">{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mt-12 mb-5 tracking-tight">🎶 Playlist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlist.map((track, index) => (
                        <div
                            key={index}
                            onClick={() => handleTrackClick(index)}
                            className={`p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-teal-700/30 hover:scale-105 transition-all duration-200 cursor-pointer shadow ${
                                index === currentTrackIndex ? 'ring-2 ring-teal-500' : ''
                            }`}
                        >
                            <h4 className="text-lg font-semibold">{track.title}</h4>
                            <p className="text-sm text-white/60">{track.artist}</p>
                        </div>
                    ))}
                </div>
            </main>

            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} />
        </div>
    );
}

export default Dashboard;
