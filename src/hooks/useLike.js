import { useEffect, useState } from "react";

export default function useLike() {

    const [like, setLike] = useState(JSON.parse(localStorage.getItem('like')) || []);

    useEffect(() => {
        console.log('lovcal', localStorage);
        console.log(JSON.parse(localStorage.getItem('like')));

    }, [like])

    const handleLike = (id) => {
        id = parseInt(id);
        if (like.includes(id)) {
            setLike((prev) => prev.filter((item) => item !== id));
            localStorage.setItem('like', JSON.stringify(like.filter((item) => item !== id)))
        } else {
            setLike((prev) => [...prev, id]);
            localStorage.setItem('like', JSON.stringify([...like, id]))
        }
    }

    return [like, handleLike];
}