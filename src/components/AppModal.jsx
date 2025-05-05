import './AppModal.css';

export default function AppModal({ isOpen, onClose, content, addBtn }) {
    if (!isOpen) return null;

    return (
        <div className={`modal-comparator ${isOpen ? 'active' : ''}`}>
            <h4>Aggiungi frutto</h4>
            <div className="modal-comparator-select">
                {content}
            </div>
            <div className="modal-actions">
                {addBtn}
                <button className="btn-close" onClick={onClose}>Chiudi</button>
                <button className="btn-confirm">Conferma</button>
            </div>
        </div>
    );
}

{/* Bottone per aprire il modal */ }
{/* <button className="fixed-bottom-right-button" ></button>  */ }