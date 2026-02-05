const DisplayTable = ({items=[], displayEditModal, setActionType}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Nom du patient</th>
                    <th>Médicament</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Statut</th>
                    <th>Commentaire</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                    <td>
                        <button onClick={() => {
                            displayEditModal(item);
                            setActionType("update")
                        }}>
                            ✎
                        </button>
                    </td>
                    <td>{item.patient_name}</td>
                    <td>{item.medication_name}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.status}</td>
                    <td>{item.comment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DisplayTable