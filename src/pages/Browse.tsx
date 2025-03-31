// pages/Browse.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useFavourites } from '../context/FavouritesContext';

function Browse() {
    const { theme } = useTheme();
    const { toggleFavourite, favourites } = useFavourites(); // Use context
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTrack, setCurrentTrack] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

    const playTrack = (track) => {
        console.log('Playing track:', track.name);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            console.log('Paused and reset previous track');
        }

        const newAudio = new Audio(track.src);
        newAudio.play().then(() => {
            console.log('Audio started playing');
            setIsPlaying(true);
        }).catch((error) => {
            console.error('Error playing audio:', error);
        });

        setAudio(newAudio);
        setCurrentTrack(track);
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
        <div className={`min-h-screen flex ${getThemeClass()} font-sans transition-all duration-500`}>
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">🔍 Browse</h2>

                {/* Search bar */}
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
                        {/* Display filtered tracks */}
                        {filteredTracks.map((track, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-purple-700/30 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow"
                                onClick={() => playTrack(track)}
                            >
                                <h4 className="text-lg font-semibold">{track.name}</h4>
                                <p className="text-sm text-white/60">{track.artist}</p>

                                {/* Favourite button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering playTrack on button click
                                        toggleFavourite(track);
                                    }}
                                    className={`mt-2 px-4 py-2 rounded-lg text-sm ${
                                        favourites.some(fav => fav.name === track.name)
                                            ? 'bg-yellow-500 text-black'
                                            : 'bg-white/20 text-white'
                                    } hover:bg-yellow-400 transition-all duration-200`}
                                >
                                    {favourites.some(fav => fav.name === track.name)
                                        ? 'Remove from Favourites'
                                        : 'Add to Favourites'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display current track name */}
                {currentTrack && (
                    <div className="mt-6">
                        <h4 className="text-2xl font-semibold text-white">Now Playing:</h4>
                        <p className="text-xl text-white/80">
                            {currentTrack.name} by {currentTrack.artist}
                        </p>

                        {/* Pause/Play button */}
                        <button
                            onClick={togglePlayPause}
                            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Browse;
