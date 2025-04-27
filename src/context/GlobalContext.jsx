import { createContext, useContext } from "react";
import useTask from "../hooks/useTasks";
import './GlobalContext.css';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [tasks, addTask, removeTask, updateTask] = useTask();

    const globalProviderValue = {
        tasks,
        addTask,
        removeTask,
        updateTask
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