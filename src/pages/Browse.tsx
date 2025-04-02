import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext'; // Import the AudioContext hook

function Browse() {
    const { theme } = useTheme();
    const { audio, isPlaying, currentTrack, playTrack, togglePlayPause } = useAudio(); // Use AudioContext
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [analyser, setAnalyser] = useState(null); // For the equalizer

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

            // Set up the analyser for the equalizer
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = audioContext.createAnalyser();
            setAnalyser(analyserNode);

            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyserNode);
            analyserNode.connect(audioContext.destination);
        }
    }, [audio]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio) {
            const newTime = parseFloat(e.target.value);
            audio.currentTime = newTime;
            setCurrentTime(newTime); // Manually update the state to reflect the change
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Function to visualize the equalizer
    const drawEqualizer = () => {
        if (analyser) {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            // Canvas element for the equalizer visualization
            const canvas = document.getElementById('equalizer');
            const canvasContext = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            canvasContext.clearRect(0, 0, width, height);

            const barWidth = (width / bufferLength) * 2.5;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i];
                canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
                x += barWidth + 1;
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            drawEqualizer();
        }, 100);

        return () => clearInterval(interval);
    }, [analyser]);

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
                            </div>
                        ))}
                    </div>
                </div>

                {currentTrack && (
                    <div className="mt-6 bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl transition duration-300">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 rounded-lg overflow-hidden shadow-lg">
                                {/* Replace with dynamic album art if available */}
                                <img src="/path/to/album-art.jpg" alt="Album Art" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-xl font-semibold text-white">{currentTrack.name}</p>
                                <p className="text-sm text-white/60">{currentTrack.artist}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center items-center space-x-6">
                            <button
                                onClick={() => {/* Handle skip to previous track */}}
                                className="p-4 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition-all duration-200"
                            >
                                ⏮️
                            </button>
                            <button
                                onClick={togglePlayPause}
                                className="p-4 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition-all duration-200"
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            <button
                                onClick={() => {/* Handle skip to next track */}}
                                className="p-4 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition-all duration-200"
                            >
                                ⏭️
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full accent-purple-600 cursor-pointer"
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-sm text-white/70">{formatTime(currentTime)}</span>
                                <span className="text-sm text-white/70">{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Volume Control */}
                        <div className="mt-4 flex justify-between items-center">
                            <label className="text-white/70 text-sm">Volume</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={audio?.volume || 1}
                                onChange={(e) => audio && (audio.volume = parseFloat(e.target.value))}
                                className="w-40 accent-purple-600 cursor-pointer"
                            />
                        </div>

                        {/* Equalizer */}
                        <div className="mt-6">
                            <canvas id="equalizer" width="100%" height="200"></canvas>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Browse;
