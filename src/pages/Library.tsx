import { useFavourites } from '../context/FavouritesContext';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { FaHeart } from 'react-icons/fa';

function Library() {
    const { theme } = useTheme();
    const { favourites, toggleFavourite } = useFavourites();

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
                                <button onClick={() => toggleFavourite(track)}>
                                    <FaHeart className={`text-xl transition-all duration-200 ${favourites.some(fav => fav.name === track.name) ? 'text-red-500' : 'text-white/40'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Library;