import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
export default function AppNavbar() {
    const { setSideVisible } = useGlobalContext();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link onClick={() => { setSideVisible(prev => !prev) }}>Preferiti</Link>
                </li>
            </ul>
        </nav>
    )
}