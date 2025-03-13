import { useRef, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Repeat,
    Shuffle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Dashboard() {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);

    const playlist = [
        {
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            url: '/music/blinding-lights.mp3',
        },
        {
            title: 'Levitating',
            artist: 'Dua Lipa',
            url: '/music/levitating.mp3',
        },
        {
            title: 'Watermelon Sugar',
            artist: 'Harry Styles',
            url: '/music/watermelon-sugar.mp3',
        },
        {
            title: 'Save Your Tears',
            artist: 'The Weeknd',
            url: '/music/save-your-tears.mp3',
        },
        {
            title: 'As It Was',
            artist: 'Harry Styles',
            url: '/music/as-it-was.mp3',
        },
    ];

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const currentTrack = playlist[currentTrackIndex];
    const { theme } = useTheme();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
            isMuted ? (audioRef.current.muted = true) : (audioRef.current.muted = false);
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (audioRef.current && playing) {
            audioRef.current.play();
        } else if (audioRef.current && !playing) {
            audioRef.current.pause();
        }
    }, [playing, currentTrackIndex]);

    const togglePlay = () => setPlaying(!playing);

    const handleNextTrack = () => {
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            setCurrentTrackIndex(randomIndex);
        } else {
            setCurrentTrackIndex((prev) =>
                prev === playlist.length - 1 ? 0 : prev + 1
            );
        }
        setPlaying(true);
    };

    const handlePrevTrack = () => {
        setCurrentTrackIndex((prev) =>
            prev === 0 ? playlist.length - 1 : prev - 1
        );
        setPlaying(true);
    };

    const handleTrackClick = (track, index) => {
        setCurrentTrackIndex(index);
        setPlaying(true);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const toggleMute = () => setIsMuted(!isMuted);
    const toggleRepeat = () => setIsRepeat(!isRepeat);
    const toggleShuffle = () => setIsShuffle(!isShuffle);

    const handleEnded = () => {
        if (isRepeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            handleNextTrack();
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
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

    return (
        <div className={`min-h-screen flex font-sans ${getThemeClass()} transition-all duration-500`}>
            <Sidebar />
            <main className="flex-1 p-6 md:p-10 lg:p-16">
                <h2 className="text-4xl font-extrabold mb-10 tracking-tight">🎧 Now Playing</h2>

                <audio
                    ref={audioRef}
                    src={currentTrack.url}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                />

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl transition-all duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-48 h-48 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-3xl flex items-center justify-center text-center text-2xl font-bold text-white shadow-inner shadow-cyan-800">
                            🎵 {currentTrack.title}
                        </div>

                        <div className="flex-1 w-full">
                            <h3 className="text-3xl font-semibold mb-1">{currentTrack.title}</h3>
                            <p className="text-white/60 text-lg mb-4">{currentTrack.artist}</p>

                            <div className="flex items-center justify-between mb-3 text-sm text-white/60">
                                <span>{formatTime(currentTime)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full mx-4 accent-teal-500"
                                />
                                <span>{formatTime(duration)}</span>
                            </div>

                            <div className="flex items-center gap-4 flex-wrap">
                                <button onClick={toggleShuffle} className={`p-2 rounded-full hover:bg-white/10 ${isShuffle && 'bg-white/10'}`}>
                                    <Shuffle />
                                </button>
                                <button onClick={handlePrevTrack} className="p-3 rounded-full hover:bg-white/10">
                                    <SkipBack />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="p-5 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 hover:scale-110 transition-transform"
                                >
                                    {playing ? <Pause size={28} /> : <Play size={28} />}
                                </button>
                                <button onClick={handleNextTrack} className="p-3 rounded-full hover:bg-white/10">
                                    <SkipForward />
                                </button>
                                <button onClick={toggleRepeat} className={`p-2 rounded-full hover:bg-white/10 ${isRepeat && 'bg-white/10'}`}>
                                    <Repeat />
                                </button>

                                <div className="flex items-center gap-2 ml-auto">
                                    {isMuted ? (
                                        <button onClick={toggleMute}>
                                            <VolumeX />
                                        </button>
                                    ) : (
                                        <button onClick={toggleMute}>
                                            <Volume2 />
                                        </button>
                                    )}
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => setVolume(e.target.value)}
                                        className="accent-teal-500 w-28"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mt-14 mb-6 tracking-tight">🎶 Playlist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlist.map((track, index) => (
                        <div
                            key={index}
                            onClick={() => handleTrackClick(track, index)}
                            className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:scale-[1.03] transition-all cursor-pointer shadow-md ${
                                currentTrackIndex === index ? 'ring-2 ring-cyan-500' : ''
                            }`}
                        >
                            <h4 className="text-xl font-semibold mb-1">{track.title}</h4>
                            <p className="text-sm text-white/60">{track.artist}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
