import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import './AppSidebar.css';

export default function AppSidebar() {
    const { sideVisible, setSideVisible } = useGlobalContext();

    return (<>
        <div>
            <div className={`sidebar ${sideVisible ? "visible" : ""}`}>
                <button onClick={() => setSideVisible(false)}>Close</button>
                <h2>Preferiti</h2>
                {/* Inserire qui i preferiti */}
            </div>
            <div className="overlay" onClick={() => setSideVisible(false)}></div>
        </div>
    </>)
}