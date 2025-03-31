import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useFavourites } from '../context/FavouritesContext';
import { FaHeart } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext'; // Import the AudioContext hook

function Browse() {
    const { theme } = useTheme();
    const { toggleFavourite, favourites } = useFavourites();
    const { audio, isPlaying, currentTrack, playTrack, togglePlayPause } = useAudio(); // Use AudioContext
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const tracks = [
        { name: 'Blinding Lights', artist: 'The Weekend', src: '/music/blinding-lights.mp3' },
        { name: 'Levitating', artist: 'Dua Lipa', src: '/music/levitating.mp3' },
        { name: 'Starboy', artist: 'The Weekend', src: '/music/starboy.mp3' },
        { name: 'Hold My Hand', artist: 'Michael Jackson', src: '/music/hold-my-hand.mp3' },
        { name: 'Angel', artist: 'Shaggy', src: '/music/angel.mp3' },
    ];

    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getThemeClass = () => {
        switch (theme) {
            case 'light':
                return 'bg-gradient-to-br from-gray-100 via-white to-gray-300 text-black';
            case 'neutral':
                return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white';
            case 'dark':
                return 'bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white';
            default:
                return '';
        }
    };

    useEffect(() => {
        if (audio) {
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
            };
        }
    }, [audio]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio) {
            audio.currentTime = parseFloat(e.target.value);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={`min-h-screen flex ${getThemeClass()} font-sans transition-all duration-500`}>
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">🔍 Browse</h2>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search for a song..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 rounded-lg border bg-white/20 text-white placeholder-white/60 focus:outline-none"
                    />
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl transition duration-300">
                    <h3 className="text-2xl font-semibold mb-4">Discover New Tracks</h3>
                    <p className="text-white/70 mb-6">Explore the latest music, albums, and artists.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTracks.map((track, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-purple-700/30 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow flex justify-between items-center"
                                onClick={() => playTrack(track)}
                            >
                                <div>
                                    <h4 className="text-lg font-semibold">{track.name}</h4>
                                    <p className="text-sm text-white/60">{track.artist}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavourite(track);
                                    }}
                                >
                                    <FaHeart className={`text-xl transition-all duration-200 ${favourites.some(fav => fav.name === track.name) ? 'text-red-500' : 'text-white/40'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {currentTrack && (
                    <div className="mt-6">
                        <h4 className="text-2xl font-semibold text-white">Now Playing:</h4>
                        <p className="text-xl text-white/80">
                            {currentTrack.name} by {currentTrack.artist}
                        </p>
                        <button
                            onClick={togglePlayPause}
                            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>

                        <div className="mt-4">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full accent-purple-600 cursor-pointer"
                            />
                            <span className="text-sm text-white/70">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Browse;
