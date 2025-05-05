import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import AppLike from '../components/AppLike';
import { useGlobalContext } from '../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import Comparator from '../components/Comparator';
import debounce from 'lodash/debounce';


export default function HomePage() {
    const { fruits, allCategory, getSingleFruit } = useGlobalContext()

    const [searchInput, setSearchInput] = useState('')
    const [boxInput, setBoxInput] = useState([])
    const [sortOrder, setSortOrder] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const [elemDaConfrontare, setElemDaConfrontare] = useState([])
    const [filters, setFilters] = useState(false)

    const comparatorRef = useRef(null)

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


    //non utilizzo il debounce perche nel caso abbia già il dato non effetto la chiamata
    async function addElemComp(id) {
        const selectedValue = parseInt(id)

        if (selectedValue) {
            const selectedItem = fruits.find(item => item.id === selectedValue)
            if (selectedItem && !elemDaConfrontare.some(item => item.id === selectedItem.id)) {
                try {
                    const response = await getSingleFruit(id)
                    setElemDaConfrontare(prev => [...prev, response])
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        if (elemDaConfrontare.length > 0) {
            comparatorRef.current.focus()
        }
    }

    const handleBoxInput = useCallback(debounce((e) => {
        setBoxInput(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value])
    }, 300), [])

    const handleInput = useCallback(debounce(setSearchInput, 300), [])

    const arrow = (sortOrder === -1 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />);

    return (
        <>
            <section className='product-list'>
                {/* SEARCH E ORDINAMENTO */}
                <div className='home-filter'>
                    <input type="ricerca" placeholder='cerca per nome' name='search' onChange={e => handleInput(e.target.value)} />
                    {/* aggiungi funzione per mostrare i filtri */}
                    <div><FontAwesomeIcon icon={faFilter} onClick={() => { setFilters(prev => !prev) }} /></div>
                    <div data-value='category' className="sortable-header" onClick={handleSort}>category {sortBy === 'category' ? arrow : ''}</div>
                    <div data-value='title' className="sortable-header" onClick={handleSort}>title {sortBy === 'title' ? arrow : ''}</div>
                </div>
                {/* CHECKBOX PER FILTRARE PER CATEGORIA */}
                <form className={`${(!filters ? 'd-none' : 'd-flex')} home-filter-checkbox`}>
                    {allCategory.map((item, index) => (
                        <div key={index}>
                            <label>{item}</label>
                            <input type="checkbox" name='checkbox' value={item} onChange={handleBoxInput} />
                        </div>
                    ))}
                </form>

                <section className='card-container' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {orderedData.length === 0 && <h2>Nessun risultato trovato</h2>}
                    {orderedData.map((item, index) => (
                        <div className='card' key={index}>
                            <h2>{item.title}</h2>
                            <AppLike id={item.id}></AppLike>
                            <p>Categoria: {item.category}</p>
                            <FontAwesomeIcon className="icon-top-right fas fa-info-circle" icon={faPlus} onClick={() => addElemComp(item.id)} />
                            <Link to={`/detail/${item.id}`}>Dettagli</Link>
                        </div>
                    ))}</section>
            </section>

            {/* COMPARATORE */}
            {elemDaConfrontare.length > 0 &&
                <section ref={comparatorRef} className='section-comparator' tabIndex={0}>
                    <div className='home-comparator-container'>
                        <div className='home-comparator'>
                            <Comparator elemDaConfrontare={elemDaConfrontare} setElemDaConfrontare={setElemDaConfrontare} />
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

