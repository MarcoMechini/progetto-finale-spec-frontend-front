import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DetailPage.css';
import AppLike from '../components/AppLike';
import { useGlobalContext } from '../context/GlobalContext';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

export default function DetailPage() {

    const { id } = useParams()
    const [fruitData, setFruitData] = useState({})
    const { getSingleFruit, deleteFruits, addFruits, putFruits } = useGlobalContext()

    const getData = async () => {
        try {
            setFruitData(await getSingleFruit(id))
        } catch (error) {
            console.error("Error fetching fruit data:", error)
        }
    }

    //al delete riportare utente sulla home page
    const handleDelete = useCallback(debounce(deleteFruits, 250), [])
    // al create far vedere elemento creato
    const handleCreate = useCallback(debounce(addFruits, 250), [])
    //al modify far vedere elemento modificato
    const handleModify = useCallback(debounce(putFruits, 250), [])

    useEffect(() => {
        getData()
    }, [id])


    return (
        <>
            <section className='card'>
                <h1>{fruitData.title}</h1>
                <AppLike id={parseInt(id)}></AppLike>
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(id)} />
                <FontAwesomeIcon icon={faPen} onClick={() => handleModify(id)} />
                <div>{fruitData.category}</div>
                <div>Calorie: {fruitData.calories}</div>
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

