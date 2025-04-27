import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import fetchData from '../utilities'
import './HomePage.css';

export default function HomePage() {
    const [searchInput, setSearchInput] = useState('')
    const [boxInput, setBoxInput] = useState('')
    const [data, setData] = useState([])

    const allCategory = useMemo(() => {
        return data.map((item) => item.category)
    }, [data])

    const getData = async () => {
        const response = await fetchData('http://localhost:3001/fruits')
        setData(response)
    }

    useEffect(() => {
        getData()
    }, [])

    const orderedData = useMemo(() => {
        let result = [...data]

        if (searchInput) {
            result = result.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()))
        }

        if (boxInput) {
            result = result.filter((item) => item.category.toLowerCase().includes(boxInput.toLowerCase()))
        }
        return result
    }, [data, searchInput, boxInput])

    return (
        <>
            <input type="ricerca" name='search' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <form>
                {allCategory.map((item, index) => (
                    <div key={index}>
                        <label>{item}</label>
                        <input type="checkbox" name='checkbox' value={item} onChange={e => setBoxInput(e.target.value)} />
                    </div>
                ))}
            </form>
            <section className='card-container'>
                {orderedData.map((item, index) => (
                    <div className='card' key={index}>
                        <h2>{item.title}</h2>
                        <p>Categoria: {item.category}</p>
                        <Link to={`/detail/${item.title}`}>Dettagli</Link>
                    </div>
                ))}</section>
        </>
    )
}

