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

    const allCategory = useMemo(() => {
        const categorys = []
        fruits.forEach((item) => {
            if (!categorys.includes(item.category)) {
                categorys.push(item.category)
            }
        })
        return categorys
    }, [fruits])


    return [fruits, setFruits, getFruits, allCategory];
}