import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import Sidebar from '../components/Sidebar';

function Settings() {
    const { theme, setTheme } = useTheme(); // Access theme and setTheme

    const getThemeBackground = () => {
        switch (theme) {
            case 'light':
                return 'bg-gradient-to-br from-gray-100 via-white to-gray-300 text-black';
            case 'neutral':
                return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white';
            case 'dark':
            default:
                return 'bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white';
        }
    };

    return (
        <div className={`min-h-screen flex font-sans transition-all duration-500 ${getThemeBackground()}`}>
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6">Settings</h2>

                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md max-w-md">
                    <h3 className="text-xl font-semibold mb-4">🎨 Choose Theme</h3>

                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'neutral')} // Update theme globally
                        className="w-full p-3 rounded-lg text-base text-black focus:outline-none bg-white"
                    >
                        <option value="dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                        <option value="neutral">Neutral Theme</option>
                    </select>

                    <p className="text-sm text-white/60 mt-4">
                        Theme will be applied instantly and saved locally.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Settings;
