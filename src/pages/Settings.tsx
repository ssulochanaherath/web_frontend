import Sidebar from '../components/Sidebar';

function Settings() {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-sans">
            <Sidebar />
            <main className="flex-1 p-10">
                <h2 className="text-4xl font-bold mb-6">Settings</h2>
                <p className="text-white/70">This is the Settings page content.</p>
            </main>
        </div>
    );
}

export default Settings;
