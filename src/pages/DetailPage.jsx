import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DetailPage.css';

export default function DetailPage() {

    const { title } = useParams()
    return (
        <>
            <h1>{title}</h1>
        </>
    )
}

