import { useState } from 'react';
import { Music } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setMessage('Please fill in both fields.');
        } else {
            setMessage(`🎶 Logged in as: ${email}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
            <div className="bg-white/10 backdrop-blur-lg border border-white/30 p-12 rounded-3xl shadow-2xl w-full max-w-lg text-white">
                <div className="flex flex-col items-center mb-8">
                    <Music className="w-16 h-16 text-white mb-6 animate-pulse" />
                    <h2 className="text-5xl font-extrabold text-center tracking-widest text-white">Login to Your Music World</h2>
                    <p className="text-lg opacity-80 mt-2 text-center">Feel the rhythm. Join the vibe.</p>
                </div>
                {message && (
                    <p className="text-center text-sm text-green-300 mb-4 transition-opacity duration-300">{message}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="mb-6">
                        <label className="block text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-500 transition duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center items-center mt-8">
                    <p className="text-sm text-white opacity-70">Don't have an account? <a href="#" className="text-purple-300 hover:underline">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
