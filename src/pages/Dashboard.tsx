import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

function Dashboard() {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTrack, setCurrentTrack] = useState({
        title: 'Blinding Lights',
        artist: 'The Weeknd',
    });

    const playlist = [
        { title: 'Blinding Lights', artist: 'The Weeknd' },
        { title: 'Levitating', artist: 'Dua Lipa' },
        { title: 'Watermelon Sugar', artist: 'Harry Styles' },
        { title: 'Save Your Tears', artist: 'The Weeknd' },
        { title: 'As It Was', artist: 'Harry Styles' },
    ];

    const { theme } = useTheme(); // Access theme from context

    const togglePlay = () => setPlaying(!playing);
    const handleVolumeChange = (e) => setVolume(e.target.value);
    const handleTrackClick = (track) => setCurrentTrack(track);

    // Map theme to background class
    const getThemeClass = () => {
        switch (theme) {
            case 'light':
                return 'bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 text-black';
            case 'neutral':
                return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white'; // This is your neutral theme
            case 'dark':
            default:
                return 'bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white';
        }
    };



    return (
        <div className={`min-h-screen flex font-sans transition-all duration-500 ${getThemeClass()}`}>
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12">
                <h2 className="text-4xl font-bold mb-8 tracking-tight">🎧 Now Playing</h2>

                <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl transition duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-44 h-44 bg-gradient-to-br from-teal-600 to-cyan-400 rounded-2xl flex justify-center items-center text-xl font-bold shadow-inner shadow-teal-900 text-center">
                            🎵 {currentTrack.title}
                        </div>


                        <div className="flex-1 w-full">
                            <h3 className="text-3xl font-bold mb-1">{currentTrack.title}</h3>
                            <p className="text-white/60 mb-6">{currentTrack.artist}</p>

                            <div className="flex items-center gap-5 mb-6">
                                <button className="bg-teal-600 p-3 rounded-full hover:bg-teal-500 hover:scale-105 transition-all duration-200">
                                    <SkipBack />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="bg-teal-700 p-5 rounded-full hover:bg-teal-600 hover:scale-110 transition-all duration-200"
                                >
                                    {playing ? <Pause size={28} /> : <Play size={28} />}
                                </button>
                                <button className="bg-teal-600 p-3 rounded-full hover:bg-teal-500 hover:scale-105 transition-all duration-200">
                                    <SkipForward />
                                </button>

                            </div>

                            <div className="flex items-center gap-4">
                                <Volume2 />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full accent-teal-600 cursor-pointer"
                                />

                                <span className="text-sm text-white/70">{volume}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mt-12 mb-5 tracking-tight">🎶 Playlist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlist.map((track, index) => {
                        const isCurrent = currentTrack.title === track.title;
                        return (
                            <div
                                key={index}
                                onClick={() => handleTrackClick(track)}
                                className={`p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-teal-700/30 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow ${
                                    isCurrent ? 'ring-2 ring-teal-500' : ''
                                }`}
                            >

                            <h4 className="text-lg font-semibold">{track.title}</h4>
                                <p className="text-sm text-white/60">{track.artist}</p>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
