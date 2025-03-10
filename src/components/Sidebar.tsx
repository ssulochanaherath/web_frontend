import { Link, useNavigate } from 'react-router-dom';
import { Music2, LogOut } from 'lucide-react';  // Importing LogOut icon
import { useState } from 'react';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false); // Sidebar is hidden by default

    const handleSignOut = () => {
        // Optionally clear authentication tokens/state here
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsExpanded(prevState => !prevState); // Toggle sidebar visibility
    };

    return (
        <div className="relative flex">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-full bg-black/80 backdrop-blur-lg transition-all duration-300 ease-in-out 
                ${isExpanded ? 'w-64' : 'w-20'} border-r border-white/20`}
            >
                {/* Music Icon at the top of the sidebar (only visible when collapsed) */}
                {!isExpanded && (
                    <button
                        onClick={toggleSidebar} // Click to toggle sidebar visibility
                        className="p-4 text-white absolute"
                        style={{ top: '8px', left: '-0px' }} // Adjust these values to move it further left and top
                    >
                        <Music2 className="w-8 h-8 text-purple-400" /> {/* Music Icon for toggling */}
                    </button>
                )}

                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 py-6">
                    {isExpanded ? (
                        <div className="flex items-center gap-2 text-2xl font-bold text-white">
                            <Music2 className="w-8 h-8 text-purple-400" />
                            <span className="text-white">MusicVibe</span>
                        </div>
                    ) : (
                        <div className="text-white"></div> // Empty div to maintain layout when collapsed
                    )}
                </div>

                {/* Sidebar navigation (only shows when expanded) */}
                <nav
                    className={`px-4 space-y-4 transition-all duration-300 ease-in-out
                    ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <Link to="/dashboard" className="block text-white/80 hover:text-purple-400 transition">Home</Link>
                    <Link to="/browse" className="block text-white/80 hover:text-purple-400 transition">Browse</Link>
                    <Link to="/library" className="block text-white/80 hover:text-purple-400 transition">Library</Link>
                    <Link to="/settings" className="block text-white/80 hover:text-purple-400 transition">Settings</Link>
                </nav>

                {/* Sign-out icon (always visible at the bottom) */}
                <div className="absolute bottom-6 left-4 right-4">
                    <button
                        onClick={handleSignOut}
                        className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition flex items-center justify-center"
                    >
                        <LogOut className="w-5 h-5" /> {/* LogOut Icon */}
                    </button>
                </div>
            </aside>

            {/* Page Content */}
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? 'ml-64' : 'ml-20'}`}
                style={{ marginLeft: isExpanded ? '16rem' : '5rem' }}
            >
            </div>
        </div>
    );
};

export default Sidebar;
