// pages/Dashboard.tsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

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

    const togglePlay = () => setPlaying(!playing);
    const handleVolumeChange = (e) => setVolume(e.target.value);
    const handleTrackClick = (track) => setCurrentTrack(track);

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-sans">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6">Now Playing</h2>

                <div className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-40 h-40 bg-gray-700 rounded-xl flex justify-center items-center text-lg font-semibold text-center">
                            🎵 {currentTrack.title}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold">{currentTrack.title}</h3>
                            <p className="text-white/70">{currentTrack.artist}</p>

                            <div className="mt-6 flex items-center gap-4">
                                <button className="bg-purple-600 p-3 rounded-full hover:bg-purple-500 transition">
                                    <SkipBack />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="bg-purple-600 p-4 rounded-full hover:bg-purple-500 transition scale-105"
                                >
                                    {playing ? <Pause /> : <Play />}
                                </button>
                                <button className="bg-purple-600 p-3 rounded-full hover:bg-purple-500 transition">
                                    <SkipForward />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mt-6">
                                <Volume2 />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full"
                                />
                                <span>{volume}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Playlist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playlist.map((track, index) => (
                        <div
                            key={index}
                            onClick={() => handleTrackClick(track)}
                            className="bg-white/10 p-4 rounded-xl hover:bg-purple-600/30 transition cursor-pointer border border-white/10"
                        >
                            <h4 className="text-lg font-bold">{track.title}</h4>
                            <p className="text-white/60">{track.artist}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
