import { createContext, useContext } from "react";
import useLike from "../hooks/useLike";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [like, handleLike] = useLike();

    const globalProviderValue = {
        like,
        handleLike
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