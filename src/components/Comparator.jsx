import { useEffect, useState } from "react";

export default function Comparator({ elemDaConfrontare, setElemDaConfrontare }) {
    // Stato per memorizzare i migliori valori nutrizionali per ogni tipo di nutriente
    const [bestValues, setBestValues] = useState({});

    useEffect(() => {
        // Funzione per calcolare i migliori valori nutrizionali
        const calculateBestValues = () => {
            const best = {};
            elemDaConfrontare.forEach((item) => {
                item.nutritionalValues.forEach((nutrient) => {
                    // Se il nutriente non è ancora registrato o il valore corrente è migliore, aggiorna
                    if (!best[nutrient.name] || best[nutrient.name].quantity < nutrient.quantity) {
                        best[nutrient.name] = {
                            title: item.title,
                            quantity: nutrient.quantity,
                        };
                    }
                });
            });
            setBestValues(best);
        };

        calculateBestValues();
    }, [elemDaConfrontare]); // Ricalcola ogni volta che cambia elemDaConfrontare

    return (
        <>
            {elemDaConfrontare.map((item, index) => {
                return (
                    <div key={index} className="home-comparator-item">
                        {/* Header della card con il titolo e il pulsante per rimuovere */}
                        <div className="home-comparator-header">
                            <h2>{item.title}</h2>
                            <button
                                className="close-comparator-button"
                                onClick={() =>
                                    setElemDaConfrontare((prev) =>
                                        prev.filter((elem) => elem.id !== item.id)
                                    )
                                }
                            >
                                X
                            </button>
                        </div>
                        {/* Mostra le calorie */}
                        <p>Calorie: {item.calories}</p>
                        {/* Mostra i valori nutrizionali */}
                        {item.nutritionalValues.map((nutrient, index) => {
                            // Controlla se il valore corrente è il migliore
                            const isBest = bestValues[nutrient.name]?.title === item.title;
                            return (
                                <div key={index}>
                                    <p>
                                        {/* la classe isBest è in index.css */}
                                        <strong className={isBest ? "isBest" : ""}>{nutrient.name}</strong>
                                        : {nutrient.quantity} {nutrient.unit}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}