import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

function Library() {
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
        <div className={`min-h-screen flex font-sans transition-all duration-500 ${getThemeClass()}`}>
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6">Library</h2>
                <p className="text-white/70">This is the Library page content.</p>
            </main>
        </div>
    );
}

export default Library;
