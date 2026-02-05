const FilterBar = ({
    handleFilterChange,
    patient=[],
    medication=[],
    filterForm,
    resetFilters,
    setActionType,
    displayCreateModal}) => {
    return (
        <form className="filter-part">
            <div className="filterForm-fields">
                <label>Patient</label>
                    <select name="patient" value={filterForm.patient} onChange={handleFilterChange}>
                        <option value="">Tous les patients</option>
                        {patient.map(item => (
                            <option key={item.id} value={item.id}>{`${item.last_name} ${item.first_name}`}</option>
                        ))}
                    </select>
                <label>Médicament</label>
                    <select name="medication" value={filterForm.medication} onChange={handleFilterChange}>
                        <option value="">Tous les médicaments</option>
                        {medication.map(item => (
                            <option key={item.id} value={item.id}>{`${item.code} - ${item.label}`}</option>
                        ))}
                    </select>
                <label>Statut</label>
                    <select name="status" value={filterForm.status} onChange={handleFilterChange}>
                        <option value="">Tous les statuts</option>
                        <option value="valide">Valide</option>
                        <option value="en_attente">En attente</option>
                        <option value="suppr">Supprimée</option>
                    </select>
                <label>Entre</label>
                    <input name="start_date__gte"
                        value={filterForm.start_date__gte}
                        onChange={handleFilterChange}
                        type="date">
                    </input>
                <label>et</label>
                    <input name="end_date__lte"
                        value={filterForm.end_date__lte}
                        onChange={handleFilterChange}
                        type="date">
                    </input>
            </div>

            <div className="filterForm-ctrl-btns">
                <button
                    type="button"
                    onClick={resetFilters}
                >
                Réinitialiser
                </button>
                <button 
                type="button"
                onClick={() => {
                    displayCreateModal();
                    setActionType("create");
                }}>
                </button>
            </div>
        </form>
    );
}

export default FilterBar;