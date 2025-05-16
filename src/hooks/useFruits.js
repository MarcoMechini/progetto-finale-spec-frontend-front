import { useEffect, useMemo, useState } from "react";
import fetchData from "../utilities";
import fruit from "../../back/fruit.js"

export default function useFruits() {

    const [fruits, setFruits] = useState([])

    const api = "http://localhost:3001"

    useEffect(() => {
        getFruits()
    }, [])

    const getFruits = async () => {
        try {
            // const response = await fetchData(`${api}/fruits`)
            setFruits(fruit)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const getSingleFruit = async (id) => {
        const idToFind = parseInt(id)
        // const response = await fetchData(`${api}/fruits/${id}`)
        const response = fruits.find(item => item.id === idToFind)

        if (response === undefined) {
            throw new Error("Error fetching single data:")
        }
        return response
    }

    const deleteFruits = async (id) => {
        const idToFind = parseInt(id);
        const response = fruits.find(fruit => fruit.id === idToFind);

        console.log(response);

        if (response) {
            setFruits(prev => prev.filter(item => item.id !== id))
        }
        if (!response) {
            throw new Error("Error deleting data:", response)
        }
    }

    const addFruits = async (data) => {
        const response = await fetch(`${api}/fruits`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok", response.messageS);
        }
        if (response) {
            setFruits(prev => [...prev, { id: prev.length + 1, ...data }])
        }

    }

    const putFruits = async (id, data) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": data.title,
                "calories": parseInt(data.calories),
                "category": data.category,
                "nutritionalValues": data.nutritionalValues
            })
        };
        const response = await fetch(`${api}/fruits/${id}`, requestOptions);

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error details:", errorDetails);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const updatedFruit = await response.json();

        // Aggiorna lo stato locale
        setFruits(prev => prev.map(fruit => fruit.id === id ? updatedFruit : fruit));

    };

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