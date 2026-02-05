import { useEffect, useState } from "react";
import './PrescriptionPage.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Pagination,
  Modal,
  DisplayTable,
  FilterBar
} from "features/prescriptions/components";
import { buildQueryParams } from "features/prescriptions/utils/resetFilters";

const PrescriptionPage = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const [actionType,setActionType] = useState(null);
    const [filterForm, setFilterForm] = useState({
        patient: "",
        medication: "",
        status: "",
        start_date__gte: "",
        end_date__lte: ""
    });
    const [medication, setMedication] = useState([]);
    const [patient, setPatient] = useState([]);
    const pageSize = 20;
    const totalPages = Math.ceil(count / pageSize);
    const EMPTY_FILTERS = {
        patient: "",
        medication: "",
        status: "",
        start_date__gte: "",
        end_date__lte: ""
    };

    const EMPTY_FORM = {
        patient: null,
        medication: null,
        start_date: "",
        end_date: "",
        status: "valide",
        comment: ""
    };

    useEffect(() => {
        const query = buildQueryParams(page,filterForm);

        fetch(`http://127.0.0.1:8000/Prescription?${query}`)
        .then(res => res.json())
        .then(data => {
            setItems(data.results);
            setCount(data.count);
        })
        .catch(err => console.error(err));
    }, [page, filterForm]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/Medication")
            .then(res => res.json())
            .then(data => {
            setMedication(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/Patient")
            .then(res => res.json())
            .then(data => {
            setPatient(data);
            })
            .catch(err => console.error(err));
    }, []);

    const displayCreateModal = () => {
        setFormData(EMPTY_FORM);
        setActionType("create");
        setShowModal(true);
    };

    const displayEditModal = (item) => {
        setFormData(item);
        setActionType("edit");
        setShowModal(true);
    };

    const editModalHandleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createPrescription = () => {
        fetch("http://127.0.0.1:8000/Prescription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => {
            if (!res.ok) throw new Error("Erreur création");
            return res.json();
            })
            .then(createdItem => {
            setItems(prev => [createdItem, ...prev]);
            toast.success("Prescription créée");
            setShowModal(false);
            })
            .catch(() => toast.error("Échec création"));
    };

    const updatePrescription = () => {
        fetch(`http://127.0.0.1:8000/Prescription/${formData.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => {
            if (!res.ok) throw new Error("Erreur mise à jour");
            return res.json();
            })
            .then(updatedItem => {
            setItems(prev =>
                prev.map(item =>
                item.id === updatedItem.id ? updatedItem : item
                )
            );
            toast.success("Prescription mise à jour");
            setShowModal(false);
            })
            .catch(() => toast.error("Échec mise à jour"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (actionType === "create") {
            createPrescription();
        } else {
            updatePrescription();
        }
    };

    const resetFilters = () => {
        setFilterForm(prev => {
            const isSame = JSON.stringify(prev) === JSON.stringify(EMPTY_FILTERS);
            if (isSame) return prev;
            setPage(1);
            return EMPTY_FILTERS;
        });
    };

    return(
        <>
            <ToastContainer position="bottom-right" />
            <section className="prescriptions-container">

                <div className="prescriptions-content-filter">
                    <FilterBar
                        filterForm={filterForm}
                        handleFilterChange={handleFilterChange}
                        patient={patient}
                        resetFilters={resetFilters}
                        medication={medication}
                        displayCreateModal={displayCreateModal}
                        setActionType={setActionType}
                    />
                    <DisplayTable
                        items={items}
                        displayEditModal={displayEditModal}
                        setActionType={setActionType}
                    />
                    {showModal &&
                    <Modal
                        actionType={actionType}
                        formData={formData}
                        onSubmit={handleSubmit}
                        onChange={editModalHandleChange}
                        setShowModal={setShowModal}
                        setFormData={setFormData}
                        patients={patient}
                        medications={medication}
                    />}
                </div>

                <Pagination
                    setPage={setPage}
                    totalPages={totalPages}
                    page={page}
                />

            </section>
        </>
    );
}

export default PrescriptionPage;