import { createContext, useContext, useState } from "react";
import useLike from "../hooks/useLike";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [like, handleLike] = useLike();
    const [sideVisible, setSideVisible] = useState(false);
    const [data, setData] = useState([])

    const globalProviderValue = {
        like, handleLike, // Like state and function
        sideVisible, setSideVisible, // Sidebar visibility state and function
        data, setData
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