import { useState } from "react";

export default function useLike() {


    // rendilo un componente a parte e passalo come props
    const [like, setLike] = useState([]);

    const handleLike = (id) => {
        console.log(like);
        id = parseInt(id);
        if (like.includes(id)) {
            setLike((prev) => prev.filter((item) => item !== id));
        } else {
            setLike((prev) => [...prev, id]);
        }
    }

    return [like, handleLike];
}