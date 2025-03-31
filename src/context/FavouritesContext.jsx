// context/FavouritesContext.jsx
import { createContext, useContext, useState } from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const toggleFavourite = (track) => {
        setFavourites((prevFavourites) => {
            if (prevFavourites.some(fav => fav.name === track.name)) {
                // Remove from favourites if already added
                return prevFavourites.filter(fav => fav.name !== track.name);
            } else {
                // Add track to favourites
                return [...prevFavourites, track];
            }
        });
    };

    return (
        <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => useContext(FavouritesContext);
