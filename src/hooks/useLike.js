import { use, useState } from "react";

export default function useLike() {

    const [like, setLike] = useState([]);

    const handleLike = (id) => {
        console.log(like);

        if (like.includes(id)) {
            setLike((prev) => prev.filter((item) => item !== id));
        } else {
            setLike((prev) => [...prev, id]);
        }
    }

    return [like, handleLike];
}