import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook

function Browse() {
    const { theme } = useTheme(); // Access theme from context

    // Map theme to background class
    const getThemeClass = () => {
        switch (theme) {
            case 'light':
                return 'bg-gradient-to-br from-gray-100 via-white to-gray-300 text-black';
            case 'purple':
                return 'bg-gradient-to-br from-purple-800 via-purple-900 to-black text-white';
            default:
                return 'bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white';
        }
    };

    return (
        <div className={`min-h-screen flex ${getThemeClass()} font-sans transition-all duration-500`}>
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">🔍 Browse</h2>

                <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl transition duration-300">
                    <h3 className="text-2xl font-semibold mb-4">Discover New Tracks</h3>
                    <p className="text-white/70 mb-6">Explore the latest music, albums, and artists.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Example content for Browse page */}
                        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-purple-700/30 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow">
                            <h4 className="text-lg font-semibold">Track 1</h4>
                            <p className="text-sm text-white/60">Artist 1</p>
                        </div>
                        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-purple-700/30 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow">
                            <h4 className="text-lg font-semibold">Track 2</h4>
                            <p className="text-sm text-white/60">Artist 2</p>
                        </div>
                        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-purple-700/30 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow">
                            <h4 className="text-lg font-semibold">Track 3</h4>
                            <p className="text-sm text-white/60">Artist 3</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Browse;
