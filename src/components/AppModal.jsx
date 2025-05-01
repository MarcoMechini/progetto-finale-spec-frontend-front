function SelectComparator({ fruits, setElemConf }) {
    return (
        <select name="fruits" id="fruits" onChange={setElemConf}>
            <option value="">Seleziona frutto</option>
            {fruits && fruits.map(curFruits => {
                return (
                    <option key={curFruits.id} value={curFruits.id}>{curFruits.title}</option>
                )
            }
            )}
        </select>)
}

function AppModal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };


    const setElemConf = async e => {
        // const selectedValue = parseInt(e.target.value)
        // if (selectedValue) {
        //     const selectedItem = fruits.find(item => item.id === selectedValue)
        //     if (selectedItem && !elemDaConfrontare.some(item => item.id === selectedItem.id)) {
        //         setElemDaConfrontare(prev => [...prev, selectedItem])
        //     }
        // }
    }

    const handleConfirm = async () => {
        // if (elemDaConfrontare.length === 2) {
        //     console.log(elemDaConfrontare);

        //     const data = elemDaConfrontare.map(item => {
        //         return fetchData(`http://localhost:3001/fruits/${item.id}`)
        //     })
        //     const response = await Promise.all(data)
        //     console.log(response);
        //     setElemDaConfrontare(response.map(item => item.fruit))
        // }
        // setElemDaConfrontare([])
    }

    return (
        <div className={`modal-comparator ${isModalOpen ? 'active' : ''}`}>
            <h4>Confronta i frutti</h4>
            <div className="modal-comparator-select">
                <SelectComparator fruits={fruits} setElemConf={setElemConf}></SelectComparator>
                <SelectComparator fruits={fruits}></SelectComparator>
            </div>

            <div className="modal-actions">
                <button className="btn-close" onClick={toggleModal}>Chiudi</button>
                <button className="btn-confirm" onClick={handleConfirm}>Conferma</button>
            </div>
        </div>
    );
}

{/* Bottone per aprire il modal */ }
<button className="fixed-bottom-right-button" onClick={toggleModal}>
    +
</button> 