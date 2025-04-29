import { useGlobalContext } from "../context/GlobalContext";
import './AppSidebar.css';
import AppLike from '../components/AppLike';

export default function AppSidebar() {
    const { like, data, sideVisible, setSideVisible } = useGlobalContext();

    const preferiti = data.filter((item) => {
        return (like.includes(item.id))
    })

    return (<>
        <div>
            <div className={`sidebar ${sideVisible ? "visible" : ""}`}>
                <button onClick={() => setSideVisible(false)}>Close</button>
                <h2>Preferiti</h2>
                {preferiti && preferiti.map((item, index) => (
                    <div className='side-row' key={index}>
                        <h2>{item.title}</h2>
                        <p>Categoria: {item.category}</p>
                        <AppLike id={item.id}></AppLike>
                    </div>))}
            </div>
            <div className="overlay" onClick={() => setSideVisible(false)}></div>
        </div>
    </>)
}