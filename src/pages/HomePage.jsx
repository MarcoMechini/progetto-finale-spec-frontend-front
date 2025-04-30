import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import AppLike from '../components/AppLike';
import { useGlobalContext } from '../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faFilter } from '@fortawesome/free-solid-svg-icons';


export default function HomePage() {
    const { fruits, allCategory } = useGlobalContext()

    const [searchInput, setSearchInput] = useState('')
    const [boxInput, setBoxInput] = useState([])
    const [sortOrder, setSortOrder] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const [elemDaConfrontare, setElemDaConfrontare] = useState([])


    const handleSort = (e) => {
        e.preventDefault()
        const currOrder = e.target.dataset.value
        if (sortBy === currOrder) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(currOrder);
            setSortOrder(1);
        }
    }

    const orderedData = useMemo(() => {
        let result = [...fruits]

        if (searchInput.trim()) {
            result = result.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()))
        }

        if (boxInput.length > 0) {
            result = result.filter((item) => boxInput.includes(item.category))
        }

        if (sortBy === "title") {
            result.sort((a, b) =>
                sortOrder === 1
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
        }
        else if (sortBy === "category") {
            result.sort((a, b) =>
                sortOrder === 1
                    ? a.category.localeCompare(b.category)
                    : b.category.localeCompare(a.category)
            );
        }
        return result
    }, [fruits, searchInput, boxInput, sortBy, sortOrder])

    const addElemComp = (e) => {
        const selectedValue = parseInt(e.target.value)
        if (selectedValue) {
            const selectedItem = fruits.find(item => item.id === selectedValue)
            if (selectedItem && !elemDaConfrontare.some(item => item.id === selectedItem.id)) {
                setElemDaConfrontare(prev => [...prev, selectedItem])
            }
        }
    }

    const handleBoxInput = e => {
        setBoxInput(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value])
    }

    const arrow = (sortOrder === -1 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />);

    return (
        <>
            <section className='product-list'>
                <div className='home-filter'>
                    <input type="ricerca" placeholder='cerca per nome' name='search' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    {/* aggiungi funzione per mostrare i filtri */}
                    <FontAwesomeIcon icon={faFilter} onClick={() => { }} />
                    <div data-value='category' className="sortable-header" onClick={handleSort}>category {sortBy === 'category' ? arrow : ''}</div>
                    <div data-value='title' className="sortable-header" onClick={handleSort}>title {sortBy === 'title' ? arrow : ''}</div>
                </div>
                <form>
                    {allCategory.map((item, index) => (
                        <div key={index}>
                            <label>{item}</label>
                            <input type="checkbox" name='checkbox' value={item} onChange={handleBoxInput} />
                        </div>
                    ))}
                </form>
                <section className='card-container' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {orderedData.map((item, index) => (
                        <div className='card' key={index}>
                            <h2>{item.title}</h2>
                            <AppLike id={item.id}></AppLike>
                            <p>Categoria: {item.category}</p>
                            <Link to={`/detail/${item.id}`}>Dettagli</Link>
                        </div>
                    ))}</section>
            </section>

            <section className='section-comparator'>
                <select name="fruits" id="fruits" onClick={addElemComp}>
                    <option value="">Seleziona frutto</option>
                    {fruits && fruits.map(curFruits => {
                        return (
                            <option key={curFruits.id} value={curFruits.id}>{curFruits.title}</option>
                        )
                    }
                    )}
                </select>

                <div>

                    <h3>Confronta</h3>
                    <div className='comparator'></div>
                    {elemDaConfrontare && elemDaConfrontare.map((item, index) => {
                        return (
                            <div key={index}>
                                <h2>{item.title}</h2>
                                {item.nutritionalValues ? 'ci sono' : 'non ci sono'} valori nutrizionali
                                {/* {item.nutritionalValues && item.nutritionalValues.map((nutrient, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{nutrient.name}: {nutrient.quantity} {nutrient.unit}</p>
                                        </div>
                                    )
                                })} */}
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

