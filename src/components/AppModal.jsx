import './AppModal.css';

export default function AppModal({ isOpen, onClose, content, addBtn, onConfirm, title }) {
    if (!isOpen) return null;

    return (
        <div className={`modal-comparator ${isOpen ? 'active' : ''}`}>
            {/* {isModifica ? <h4>Modifica frutto</h4> : <h4>Aggiungi frutto</h4>}*/}
            {title}
            <div className="modal-comparator-select">
                {content}
            </div>
            <div className="modal-actions">
                {addBtn}
                <button className="btn-close" onClick={onClose}>Chiudi</button>
                <button className="btn-confirm" onClick={onConfirm}>Conferma</button>
            </div>
        </div>
    );
}