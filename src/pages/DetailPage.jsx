import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DetailPage.css';
import fetchData from '../utilities';
import AppLike from '../components/AppLike';

export default function DetailPage() {

    const { id } = useParams()
    const [fruitData, setFruitData] = useState({})

    const getData = async () => {
        try {
            const response = await fetchData(`http://localhost:3001/fruits/${id}`)
            setFruitData(response.fruit)
        } catch (error) {
            console.error("Error fetching fruit data:", error)
        }
    }

    useEffect(() => {
        getData()
    }, [id])


    return (
        <>
            <section className='card'>
                <h1>{fruitData.title}</h1>
                <AppLike id={parseInt(id)}></AppLike>
                <div>{fruitData.category}</div>
                <div>Calories: {fruitData.calories}</div>
                {fruitData.nutritionalValues && fruitData.nutritionalValues.map((item, index) => {
                    return (
                        <div className='nutritionalValues' key={index}>
                            <span>{item.name}</span>
                            <span>{item.quantity} {item.unit}</span>
                        </div>
                    )
                })
                }

            </section>

        </>
    )
}

