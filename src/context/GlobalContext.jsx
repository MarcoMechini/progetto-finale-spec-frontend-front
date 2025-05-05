import { createContext, useContext, useState } from "react";
import useFruits from "../hooks/useFruits";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [like, setLike] = useState(JSON.parse(localStorage.getItem('like')) || []);
    const [fruits, setFruits, getFruits, getSingleFruit, deleteFruits, addFruits, putFruits, allCategory] = useFruits()

    const [sideVisible, setSideVisible] = useState(false);

    const handleLike = (id) => {
        id = parseInt(id);
        if (like.includes(id)) {
            setLike((prev) => prev.filter((item) => item !== id));
            localStorage.setItem('like', JSON.stringify(like.filter((item) => item !== id)))
        } else {
            setLike((prev) => [...prev, id]);
            localStorage.setItem('like', JSON.stringify([...like, id]))
        }
    }


    const globalProviderValue = {
        like, handleLike, // Like state and function
        sideVisible, setSideVisible, // Sidebar visibility state and function
        fruits, setFruits, getFruits, getSingleFruit, deleteFruits, addFruits, putFruits, allCategory
    };

    return (
        <GlobalContext.Provider value={globalProviderValue}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext error");
    }
    return context;
}

export { useGlobalContext, GlobalProvider };