import { useState } from 'react';
import { Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Use navigate to programmatically navigate

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setMessage('Please fill in both fields.');
        } else {
            setMessage(`🎶 Logged in as: ${email}`);
            // Navigate to dashboard after successful login
            setTimeout(() => navigate('/dashboard'), 1000); // Delay to show login message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/your-image.jpg')" }}>
            <div className="bg-black/60 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-xl w-full max-w-sm text-white opacity-90 transform transition-all duration-500 ease-in-out hover:scale-105">
                <div className="flex flex-col items-center mb-6">
                    <Music className="w-16 h-16 text-white mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-center tracking-widest text-white">Login to Your Music World</h2>
                    <p className="text-sm opacity-70 mt-2 text-center">Feel the rhythm. Join the vibe.</p>
                </div>
                {message && (
                    <p className="text-center text-sm text-green-300 mb-4 opacity-0 animate-fadeIn transition-opacity duration-500">{message}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-sm mb-2 opacity-80">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 opacity-80">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
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
                <div className="flex justify-center items-center mt-6">
                    <p className="text-sm text-white opacity-70">
                        Don't have an account?
                        <span
                            className="text-purple-300 hover:underline cursor-pointer"
                            onClick={() => navigate('/signup')}
                        > Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
