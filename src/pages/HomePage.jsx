import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import AppLike from '../components/AppLike';
import { useGlobalContext } from '../context/GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faFilter, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Comparator from '../components/Comparator';
import debounce from 'lodash/debounce';
import AppModal from '../components/AppModal';

const defaultValues = {
    "title": "Banana",
    "calories": 89,
    "category": "Bacche",
    "nutritionalValues": [
        {
            "name": "Carboidrati",
            "quantity": 23,
            "unit": "g"
        },
        {
            "name": "Fibre",
            "quantity": 2.6,
            "unit": "g"
        },
        {
            "name": "Zuccheri",
            "quantity": 12,
            "unit": "g"
        },
        {
            "name": "Potassio",
            "quantity": 358,
            "unit": "mg"
        },
        {
            "name": "Vitamina B6",
            "quantity": 0.4,
            "unit": "mg"
        }
    ]
}

const initialValue = {
    "title": "",
    "category": "",
    "calories": 0,
    "nutritionalValues": [
        {
            "name": "",
            "quantity": 0,
            "unit": ""
        }
    ]
}

export default function HomePage() {
    const { fruits, allCategory, getSingleFruit, deleteFruits, addFruits } = useGlobalContext()

    const [searchInput, setSearchInput] = useState('')
    const [boxInput, setBoxInput] = useState([])
    const [sortOrder, setSortOrder] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const [elemDaConfrontare, setElemDaConfrontare] = useState([])
    const [filters, setFilters] = useState(false)
    const [modalBool, setModalBool] = useState(false)
    const [formData, setFormData] = useState(initialValue);

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
        if ((!boxInput.includes('Tutti')) && boxInput.length > 0) {
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

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        console.log(formData);

        if (index === undefined) {
            setFormData({ ...formData, [name]: value });
        } else {
            setFormData(prevState => ({
                ...prevState,
                nutritionalValues: prevState.nutritionalValues.map((item, i) =>
                    i === index ? { ...item, [name]: value } : item
                )
            }))
        }
    }

    const addRowFormData = () => {
        setFormData(prevState => ({
            ...prevState,
            nutritionalValues: [...prevState.nutritionalValues, { name: "", quantity: 0, unit: "" }]
        }))
    }

    const handleBoxInput = useCallback(debounce((e) => {
        setBoxInput(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value])
    }, 300), [])

    const handleInput = useCallback(debounce(setSearchInput, 300), [])
    const handleCreate = useCallback(debounce(data => {
        try {
            addFruits(data)
        } catch (err) {
            console.error(err);
        }
    }
        , 250), [])
    const handleDelete = useCallback(debounce(id => {
        try {
            deleteFruits(id)
        } catch (error) {
            console.error(error);

        }
    }, 250), [])

    const arrow = (sortOrder === -1 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />);

    return (
        <>
            <section className='product-list'>
                {/* SEARCH E ORDINAMENTO */}
                <div className='home-filter'>
                    <input type="ricerca" placeholder='cerca per nome' name='search' autoComplete='off' onChange={e => handleInput(e.target.value)} />
                    {/* aggiungi funzione per mostrare i filtri */}
                    <div><FontAwesomeIcon icon={faFilter} onClick={() => { setFilters(prev => !prev) }} /></div>
                    <div data-value='category' className="sortable-header" onClick={handleSort}>category {sortBy === 'category' ? arrow : ''}</div>
                    <div data-value='title' className="sortable-header" onClick={handleSort}>title {sortBy === 'title' ? arrow : ''}</div>
                </div>
                {/* CHECKBOX PER FILTRARE PER CATEGORIA */}
                <form className={`${(!filters ? 'd-none' : 'd-flex')} home-filter-checkbox`}>
                    <div>
                        <label>Tutti</label>
                        <input type="checkbox" name='checkbox' value='Tutti' onChange={handleBoxInput} />
                    </div>
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
                        <div className='card' id={item.id} key={index}>
                            <h2>{item.title}</h2>
                            <AppLike id={item.id}></AppLike>
                            <p>Categoria: {item.category}</p>
                            <FontAwesomeIcon className='home-icon-top home-icon-top-left' icon={faTrash} onClick={() => handleDelete(item.id)} />
                            <FontAwesomeIcon className="home-icon-top home-icon-top-right " icon={faPlus} onClick={() => addElemComp(item.id)} />
                            <Link to={`/detail/${item.id}`}>Dettagli</Link>
                        </div>
                    ))}</section>
            </section>

            {/* COMPARATORE */}
            {elemDaConfrontare.length > 0 &&
                <section ref={comparatorRef} className='section-comparator' tabIndex={0}>
                    <button
                        className="close-comparator-button"
                        onClick={() => setElemDaConfrontare([])}
                    >
                        X
                    </button>
                    <div className='home-comparator-container'>
                        <div className='home-comparator'>
                            <Comparator elemDaConfrontare={elemDaConfrontare} setElemDaConfrontare={setElemDaConfrontare} />
                        </div>
                    </div>
                </section>
            }

            <button onClick={() => setModalBool(prev => !prev)} className="fixed-bottom-right-button">
                +
            </button>

            <AppModal
                isOpen={modalBool}
                title={<h4>Aggiungi frutto</h4>}
                onClose={() => setModalBool(false)}
                addBtn={<button onClick={addRowFormData}>+</button>}
                onConfirm={() => {
                    handleCreate(formData);
                    setModalBool(false);
                }}
                content={
                    <form>
                        <input type='text' name="title" onChange={handleInputChange} value={formData.title} placeholder='Nome' />
                        <input type='text' name="category" onChange={handleInputChange} value={formData.category} placeholder='Categoria' />
                        <input type='number' name="calories" onChange={handleInputChange} value={formData.calories} placeholder='Calorie' />

                        {formData.nutritionalValues && formData.nutritionalValues.map((item, index) => {
                            return (
                                <div className='nutritionalValues' key={index}>
                                    <input type='text' name="name" onChange={(e) => handleInputChange(e, index)} value={item.name} placeholder='Nome' />
                                    <input type='number' name="quantity" onChange={(e) => handleInputChange(e, index)} value={item.quantity} placeholder='Quantità' />
                                    {/* possibilità di fare un select */}
                                    <input type='text' name="unit" onChange={(e) => handleInputChange(e, index)} value={item.unit} placeholder='unità' />
                                </div>
                            )
                        })}
                    </form>}

            />
        </>
    )
}

