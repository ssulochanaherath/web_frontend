import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from './context/ThemeContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { AudioProvider } from './context/AudioContext';
import "./App.css";
import { RootLayout } from "./components/RootLayout";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Browse from "./pages/Browse.tsx";
import Library from "./pages/Library.tsx";
import Settings from "./pages/Settings.tsx";
import Signup from "./pages/Signup.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/browse", element: <Browse /> },
            { path: "/library", element: <Library /> },
            { path: "/settings", element: <Settings /> },
            { path: "/signup", element: <Signup /> },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider>
            <FavouritesProvider>
                <AudioProvider> {/* Add AudioProvider here */}
                    <RouterProvider router={router} />
                </AudioProvider>
            </FavouritesProvider>
        </ThemeProvider>
    );
}

export default App;
