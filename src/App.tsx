import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from './context/ThemeContext';
import "./App.css";
import { RootLayout } from "./components/RootLayout";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Browse from "./pages/Browse.tsx";
import Library from "./pages/Library.tsx";
import Settings from "./pages/Settings.tsx";

function App() {
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

    return (
        <ThemeProvider>  {/* Wrap your app with ThemeProvider */}
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
