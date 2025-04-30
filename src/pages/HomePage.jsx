import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import AppLike from '../components/AppLike';
import { useGlobalContext } from '../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import fetchData from '../utilities';

function SelectComparator({ fruits, setElemConf }) {
    return (
        <select name="fruits" id="fruits" onChange={setElemConf}>
            <option value="">Seleziona frutto</option>
            {fruits && fruits.map(curFruits => {
                return (
                    <option key={curFruits.id} value={curFruits.id}>{curFruits.title}</option>
                )
            }
            )}
        </select>)
}

export default function HomePage() {
    const { fruits, allCategory } = useGlobalContext()

    const [searchInput, setSearchInput] = useState('')
    const [boxInput, setBoxInput] = useState([])
    const [sortOrder, setSortOrder] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const [elemDaConfrontare, setElemDaConfrontare] = useState([])
    const [filters, setFilters] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

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

    const addElemComp = async (id) => {
        const selectedValue = parseInt(id)
        if (selectedValue) {
            const selectedItem = fruits.find(item => item.id === selectedValue)
            if (selectedItem && !elemDaConfrontare.some(item => item.id === selectedItem.id)) {
                const response = await fetchData(`http://localhost:3001/fruits/${selectedItem.id}`)
                setElemDaConfrontare(prev => [...prev, response.fruit])
            }
        }
    }

    const setElemConf = async e => {
        // const selectedValue = parseInt(e.target.value)
        // if (selectedValue) {
        //     const selectedItem = fruits.find(item => item.id === selectedValue)
        //     if (selectedItem && !elemDaConfrontare.some(item => item.id === selectedItem.id)) {
        //         setElemDaConfrontare(prev => [...prev, selectedItem])
        //     }
        // }
    }

    const handleConfirm = async () => {
        // if (elemDaConfrontare.length === 2) {
        //     console.log(elemDaConfrontare);

        //     const data = elemDaConfrontare.map(item => {
        //         return fetchData(`http://localhost:3001/fruits/${item.id}`)
        //     })
        //     const response = await Promise.all(data)
        //     console.log(response);
        //     setElemDaConfrontare(response.map(item => item.fruit))
        // }
        // setElemDaConfrontare([])
    }

    const handleBoxInput = e => {
        setBoxInput(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value])
    }

    const arrow = (sortOrder === -1 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />);

    return (
        <>
            <section className='product-list'>
                {/* SEARCH E ORDINAMENTO */}
                <div className='home-filter'>
                    <input type="ricerca" placeholder='cerca per nome' name='search' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
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

            <section className='section-comparator'>
                <div className='home-comparator-container'>
                    <div className='home-comparator'>
                        {elemDaConfrontare && elemDaConfrontare.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className='home-comparator-header'>
                                        <h2>{item.title}</h2>
                                        <button className={'close-comparator-button '} onClick={() => setElemDaConfrontare(prev => prev.filter(elem => elem.id !== item.id))}>X</button>
                                    </div>
                                    {item.nutritionalValues && item.nutritionalValues.map((nutrient, index) => {
                                        return (
                                            <div key={index}>
                                                <p>{nutrient.name}: {nutrient.quantity} {nutrient.unit}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Bottone per aprire il modal */}
            <button className="fixed-bottom-right-button" onClick={toggleModal}>
                +
            </button>

            {/* Modal Comparator */}
            <div className={`modal-comparator ${isModalOpen ? 'active' : ''}`}>
                <h4>Confronta i frutti</h4>
                <div className="modal-comparator-select">
                    <SelectComparator fruits={fruits} setElemConf={setElemConf}></SelectComparator>
                    <SelectComparator fruits={fruits}></SelectComparator>
                </div>

                <div className="modal-actions">
                    <button className="btn-close" onClick={toggleModal}>Chiudi</button>
                    <button className="btn-confirm" onClick={handleConfirm}>Conferma</button>
                </div>
            </div>
        </>
    )
}

