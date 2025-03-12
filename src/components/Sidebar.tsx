import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Music2, LogOut, Home, Library, Settings, Search } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = () => {
        navigate('/login');
    };

    const navLinks = [
        { path: '/dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
        { path: '/browse', label: 'Browse', icon: <Search className="w-5 h-5" /> },
        { path: '/library', label: 'Library', icon: <Library className="w-5 h-5" /> },
        { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <div className="relative flex">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 z-40 h-full w-20 bg-black/60 backdrop-blur-xl border-r border-white/10 shadow-xl flex flex-col items-center py-6 rounded-r-2xl">
                {/* Header Icon */}
                <div className="mb-10">
                    <Music2 className="w-6 h-6 text-teal-400 hover:scale-110 transition-transform duration-200" />
                </div>

                {/* Navigation Icons */}
                <nav className="flex flex-col items-center gap-4 flex-grow">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`group relative p-3 rounded-xl transition-all duration-200 ease-in-out hover:bg-purple-500/10 hover:shadow-md
                                ${location.pathname === link.path
                                ? 'bg-teal-500/20 text-teal-500 shadow-lg'
                                : 'text-white/80 hover:text-teal-300'}`}
                        >
                            {link.icon}
                            {/* Tooltip */}
                            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Sign Out Button */}
                <div className="mb-4">
                    <button
                        onClick={handleSignOut}
                        className="group relative p-3 rounded-xl bg-teal-400 hover:bg-teal-500 text-white transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <LogOut className="w-5 h-5" />
                        {/* Tooltip */}
                        <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>

            {/* Page Content */}
            <div className="flex-1 ml-20 transition-all duration-300 ease-in-out" />
        </div>
    );
};

export default Sidebar;
