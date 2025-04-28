
const fetchData = async (url) => {

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const json = await response.json()
    return json
}

export default fetchData