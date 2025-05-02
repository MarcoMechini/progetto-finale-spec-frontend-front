import { useGlobalContext } from "../context/GlobalContext";
import './AppSidebar.css';
import AppLike from '../components/AppLike';

export default function AppSidebar() {
    const { like, fruits, sideVisible, setSideVisible } = useGlobalContext();

    const preferiti = fruits.filter((item) => {
        return (like.includes(item.id))
    })

    return (<>
        <div>
            <div className={`sidebar ${sideVisible ? "visible" : ""}`}>
                <button className={'close-sidebar-button'} onClick={() => setSideVisible(false)}>X</button>
                <h2>Preferiti</h2>
                {preferiti.length < 1 && <p>Non hai ancora aggiunto nulla ai preferiti</p>}
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