import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from './context/ThemeContext';
import { FavouritesProvider } from './context/FavouritesContext';
import "./App.css";
import { RootLayout } from "./components/RootLayout";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Browse from "./pages/Browse.tsx";
import Library from "./pages/Library.tsx";
import Settings from "./pages/Settings.tsx";

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
        ],
    },
]);

function App() {
    return (
        <ThemeProvider> {/* Wrap app with ThemeProvider */}
            <FavouritesProvider> {/* Wrap app with FavouritesProvider */}
                <RouterProvider router={router} />
            </FavouritesProvider>
        </ThemeProvider>
    );
}

export default App;