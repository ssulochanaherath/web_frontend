import { useFavourites } from '../context/FavouritesContext';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { FaHeart, FaPause, FaPlay } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext'; // Import useAudio hook

function Library() {
    const { theme } = useTheme();
    const { favourites, toggleFavourite } = useFavourites();
    const { playTrack, togglePlayPause, currentTrack, isPlaying } = useAudio();

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

    const handlePlayPause = (track) => {
        if (currentTrack?.name === track.name && isPlaying) {
            // If the same track is playing, pause it
            togglePlayPause();
        } else if (currentTrack?.name === track.name && !isPlaying) {
            // If the track is paused, play it
            togglePlayPause();
        } else {
            // If a different track is selected, play the new track
            playTrack(track);
        }
    };

    return (
        <div className={`min-h-screen flex ${getThemeClass()} font-sans transition-all duration-500`}>
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">🎵 Your Library</h2>
                {favourites.length === 0 ? (
                    <p className="text-xl">No favourite tracks added yet!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favourites.map((track, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="text-lg font-semibold">{track.name}</h4>
                                    <p className="text-sm text-white/60">{track.artist}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handlePlayPause(track)} // Toggle between play and pause
                                        className="p-2 text-white/60 hover:text-white transition-all duration-200"
                                    >
                                        {currentTrack?.name === track.name && isPlaying ? (
                                            <FaPause className="text-xl" /> // Show pause if the track is playing
                                        ) : (
                                            <FaPlay className="text-xl" /> // Show play if the track is paused
                                        )}
                                    </button>
                                    <button
                                        onClick={() => toggleFavourite(track)}
                                        className="text-white/40 hover:text-red-500 transition-all duration-200"
                                    >
                                        <FaHeart className={`text-xl ${favourites.some(fav => fav.name === track.name) ? 'text-red-500' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Library;
