import { createContext, useContext, useState } from "react";
import useLike from "../hooks/useLike";
import useFruits from "../hooks/useFruits";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [like, handleLike] = useLike();
    const [fruits, setFruits, getFruits, allCategory] = useFruits()

    const [sideVisible, setSideVisible] = useState(false);

    const globalProviderValue = {
        like, handleLike, // Like state and function
        sideVisible, setSideVisible, // Sidebar visibility state and function
        fruits, setFruits, getFruits, allCategory
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