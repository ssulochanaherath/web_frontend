import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Dashboard() {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(50);

    const playlist = [
        { title: 'Blinding Lights', artist: 'The Weeknd' },
        { title: 'Levitating', artist: 'Dua Lipa' },
        { title: 'Watermelon Sugar', artist: 'Harry Styles' },
        { title: 'Save Your Tears', artist: 'The Weeknd' },
        { title: 'As It Was', artist: 'Harry Styles' },
    ];

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const currentTrack = playlist[currentTrackIndex];

    const { theme } = useTheme();

    const togglePlay = () => setPlaying(!playing);
    const handleVolumeChange = (e) => setVolume(e.target.value);

    const handleTrackClick = (track, index) => {
        setCurrentTrackIndex(index);
        setPlaying(true);
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
        setPlaying(true);
    };

    const handlePrevTrack = () => {
        setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
        setPlaying(true);
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
        <div className={`min-h-screen flex font-sans transition-all duration-500 ${getThemeClass()}`}>
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 lg:p-16">
                <h2 className="text-4xl font-extrabold mb-10 tracking-tight">🎧 Now Playing</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-48 h-48 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-3xl flex items-center justify-center text-center text-2xl font-bold text-white shadow-inner shadow-cyan-800">
                            🎵 {currentTrack.title}
                        </div>

                        <div className="flex-1 w-full">
                            <h3 className="text-3xl font-semibold mb-1">{currentTrack.title}</h3>
                            <p className="text-white/60 text-lg mb-6">{currentTrack.artist}</p>

                            <div className="flex items-center gap-6 mb-8">
                                <button
                                    onClick={handlePrevTrack}
                                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-105 transition-all"
                                >
                                    <SkipBack />
                                </button>

                                <button
                                    onClick={togglePlay}
                                    className="bg-gradient-to-tr from-teal-600 to-cyan-500 p-5 rounded-full hover:scale-110 transition-transform"
                                >
                                    {playing ? <Pause size={30} /> : <Play size={30} />}
                                </button>

                                <button
                                    onClick={handleNextTrack}
                                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 hover:scale-105 transition-all"
                                >
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
                                    className="w-full accent-teal-500 cursor-pointer"
                                />
                                <span className="text-sm text-white/70">{volume}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mt-14 mb-6 tracking-tight">🎶 Playlist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlist.map((track, index) => {
                        const isCurrent = currentTrackIndex === index;
                        return (
                            <div
                                key={index}
                                onClick={() => handleTrackClick(track, index)}
                                className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:scale-[1.03] transition-all cursor-pointer shadow-md ${
                                    isCurrent ? 'ring-2 ring-cyan-500 shadow-lg' : ''
                                }`}
                            >
                                <h4 className="text-xl font-semibold mb-1">{track.title}</h4>
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
