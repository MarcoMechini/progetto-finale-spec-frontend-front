import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import fetchData from '../utilities'
import './HomePage.css';
import { useGlobalContext } from '../context/GlobalContext';
import AppLike from '../components/AppLike';


export default function HomePage() {
    const [searchInput, setSearchInput] = useState('')
    const [boxInput, setBoxInput] = useState([])
    const [data, setData] = useState([])
    const [sortOrder, setSortOrder] = useState(1)
    const [sortBy, setSortBy] = useState('title')
    const { like, handleLike } = useGlobalContext()

    const allCategory = useMemo(() => {
        const categorys = []
        data.forEach((item) => {
            if (!categorys.includes(item.category)) {
                categorys.push(item.category)
            }
        })

        return categorys
    }, [data])

    const getData = async () => {
        try {
            const response = await fetchData('http://localhost:3001/fruits')
            setData(response)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

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
        let result = [...data]

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
    }, [data, searchInput, boxInput, sortBy, sortOrder])


    const handleBoxInput = e => {
        setBoxInput(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value])
    }

    const arrow = (sortOrder === -1 ? '▲' : '▼');

    return (
        <>
            <input type="ricerca" placeholder='cerca per nome' name='search' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <form>
                {allCategory.map((item, index) => (
                    <div key={index}>
                        <label>{item}</label>
                        <input type="checkbox" name='checkbox' value={item} onChange={handleBoxInput} />
                    </div>
                ))}
            </form>
            <div data-value='category' className="sortable-header" onClick={handleSort}>category {sortBy === 'category' ? arrow : ''}</div>
            <div data-value='title' className="sortable-header" onClick={handleSort}>title {sortBy === 'title' ? arrow : ''}</div>
            <section className='card-container' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {orderedData.map((item, index) => (
                    <div className='card' key={index}>
                        <h2>{item.title}</h2>
                        <AppLike id={item.id}></AppLike>
                        <p>Categoria: {item.category}</p>
                        <Link to={`/detail/${item.id}`}>Dettagli</Link>
                    </div>
                ))}</section>
        </>
    )
}

