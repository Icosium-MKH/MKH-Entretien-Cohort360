import "./Modal.css"

const Modal = ({
  actionType,
  formData,
  patients,
  medications,
  setShowModal,
  setFormData,
  onSubmit,
  onChange
}) => {
    return (
        <div className="modal-overlay">
            <form className="modal" onSubmit={onSubmit}>
            <h2>
                {actionType === "create"
                ? "Créer une prescription"
                : "Modifier la prescription"}
            </h2>

            <label>
                Patient
                <select
                    value={formData.patient ?? ""}
                    onChange={(e) =>
                        setFormData(prev => ({
                        ...prev,
                        patient: Number(e.target.value)
                        }))
                    }
                    >
                    <option value="">-- Choisir un patient --</option>
                    {patients.map(p => (
                        <option key={p.id} value={p.id}>
                            {`${p.last_name} ${p.first_name}`}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Médicament
                <select
                    value={formData.medication ?? ""}
                    onChange={(e) =>
                        setFormData(prev => ({
                        ...prev,
                        medication: Number(e.target.value)
                        }))
                    }
                    >
                    <option value="">-- Choisir un médicament --</option>
                    {medications.map(m => (
                        <option key={m.id} value={m.id}>
                        {m.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Date de début
                <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={onChange}
                />
            </label>

            <label>
                Date de fin
                <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={onChange}
                />
            </label>

            <label>
                Statut
                <select
                name="status"
                value={formData.status}
                onChange={onChange}
                >
                <option value="valide">Valide</option>
                <option value="en_attente">En attente</option>
                <option value="suppr">Supprimée</option>
                </select>
            </label>

            <label>
                Commentaire
                <textarea
                name="comment"
                value={formData.comment}
                onChange={onChange}
                />
            </label>

            <div className="modal-actions">
                <button className="cancel-update" type="button" onClick={() => setShowModal(false)}>
                Annuler
                </button>
                <button className="save-update" type="submit">
                    {actionType === "create" ? "Créer" : "Enregistrer"}
                </button>
            </div>
            </form>
        </div>
    );
}

export default Modal;