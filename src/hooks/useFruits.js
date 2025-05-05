import { useEffect, useMemo, useState } from "react";
import fetchData from "../utilities";

export default function useFruits() {

    const [fruits, setFruits] = useState([])

    useEffect(() => {
        getFruits()
    }, [])

    const getFruits = async () => {
        try {
            const response = await fetchData('http://localhost:3001/fruits')
            setFruits(response)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const getSingleFruit = async (id) => {
        try {
            const response = await fetchData(`http://localhost:3001/fruits/${id}`)
            return response.fruit
        } catch (error) {
            throw new Error("Error deleting data:", error)
        }
    }

    const deleteFruits = async (id) => {
        console.log('deleteFruits', id);

        // const response = await fetchData(`http://localhost:3001/fruits/${id}`, {
        //     method: 'DELETE'
        // })
        // if (response) {
        //     setFruits(prev => prev.filter(item => item.id !== id))
        // }
        // if (!response.ok) {
        //     throw new Error("Error deleting data:", error)
        // }
    }

    const addFruits = async () => {
        console.log('addFruits');

        // const response = await fetch("https://example.org/post", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         username: "example" //oggetto da inserire
        //     }),
        // });
        // if (!response.ok) {
        //     throw new Error("Network response was not ok");
        // }
        // if (response) {
        //     setFruits(prev => [...prev, response])
        // }
    }

    const putFruits = async (id) => {
        console.log('putFruits', id);

        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'Fetch PUT Request Example' })
        // };
        // fetch('https://reqres.in/api/articles/1', requestOptions)
        //     .then(response => response.json())
        //     .then(data => element.innerHTML = data.updatedAt );
    }

    const allCategory = useMemo(() => {
        const categorys = []
        fruits.forEach((item) => {
            if (!categorys.includes(item.category)) {
                categorys.push(item.category)
            }
        })
        return categorys
    }, [fruits])


    return [fruits, setFruits, getFruits, getSingleFruit, deleteFruits, addFruits, putFruits, allCategory];
}